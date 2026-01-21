/**
 * CSV Map to JSON Converter
 * 
 * Usage: node scripts/csvToMapJson.js <csv_file> <output_json> [mapId] [mapName]
 * 
 * Example:
 *   node scripts/csvToMapJson.js src/data/world/maps/world_01.csv src/data/world/world_01.json
 */

const fs = require('fs');
const path = require('path');

// タイル定義を読み込み
const tileDefsPath = path.join(__dirname, '../src/data/tiles/tile_definitions.json');
const tileDefinitions = JSON.parse(fs.readFileSync(tileDefsPath, 'utf-8'));

function parseCSV(csvContent) {
    const lines = csvContent.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#')); // コメント行を除外

    return lines.map(line => line.split(',').map(cell => cell.trim()));
}

function convertCsvToMapJson(csvPath, mapId, mapName, options = {}) {
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const grid = parseCSV(csvContent);

    if (grid.length === 0) {
        throw new Error('Empty CSV file');
    }

    const height = grid.length;
    const width = Math.max(...grid.map(row => row.length));

    const tiles = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const code = grid[y]?.[x] || '__';
            const tileDef = tileDefinitions.tiles[code];

            if (!tileDef) {
                console.warn(`Warning: Unknown tile code "${code}" at (${x}, ${y})`);
                continue;
            }

            if (tileDef.terrainCardId === null) {
                continue; // 空白タイルはスキップ
            }

            const tile = {
                id: `t_${x}_${y}`,
                x,
                y,
                terrainCardId: tileDef.terrainCardId,
                isTraversable: tileDef.traversable
            };

            // オプショナルプロパティを追加
            if (tileDef.name) tile.name = tileDef.name;
            if (tileDef.buildingType) tile.buildingType = tileDef.buildingType;

            tiles.push(tile);
        }
    }

    const mapJson = {
        mapId,
        name: mapName,
        grid: { width, height },
        tiles
    };

    if (options.type) mapJson.type = options.type;
    if (options.bgm) mapJson.bgm = options.bgm;
    if (options.startX !== undefined && options.startY !== undefined) {
        mapJson.startPosition = { x: options.startX, y: options.startY };
    }

    return mapJson;
}

// メイン処理
function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log('Usage: node scripts/csvToMapJson.js <csv_file> <output_json> [mapId] [mapName]');
        console.log('');
        console.log('Examples:');
        console.log('  node scripts/csvToMapJson.js src/data/world/maps/world_01.csv src/data/world/world_01.json world_01 "テストマップ"');
        console.log('  node scripts/csvToMapJson.js src/data/world/maps/town_01.csv src/data/world/town_01.json town_01 "始まりの町"');
        process.exit(1);
    }

    const [csvPath, outputPath, mapId, mapName] = args;

    const finalMapId = mapId || path.basename(csvPath, '.csv');
    const finalMapName = mapName || finalMapId;

    try {
        const mapJson = convertCsvToMapJson(csvPath, finalMapId, finalMapName, {
            startX: 7,
            startY: 7
        });

        fs.writeFileSync(outputPath, JSON.stringify(mapJson, null, 4));
        console.log(`✅ Converted: ${csvPath} -> ${outputPath}`);
        console.log(`   Grid: ${mapJson.grid.width}x${mapJson.grid.height}`);
        console.log(`   Tiles: ${mapJson.tiles.length}`);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
