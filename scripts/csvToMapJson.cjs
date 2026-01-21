/**
 * CSV Map to JSON Converter
 * 
 * Usage: node scripts/csvToMapJson.cjs <csv_file> <output_json> [mapId] [mapName]
 */

const fs = require('fs');
const path = require('path');

// タイル定義を読み込み
const tileDefsPath = path.join(__dirname, '../src/data/tiles/tile_definitions.json');
const tileDefinitions = JSON.parse(fs.readFileSync(tileDefsPath, 'utf-8'));

function parseCSV(csvContent) {
    const lines = csvContent.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'));
    return lines.map(line => line.split(',').map(cell => cell.trim()));
}

function convertCsvToMapJson(csvPath, mapId, mapName, options = {}) {
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const grid = parseCSV(csvContent);

    if (grid.length === 0) throw new Error('Empty CSV file');

    const height = grid.length;
    const width = Math.max(...grid.map(row => row.length));

    const tiles = [];
    let exitPosition = null;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const code = grid[y]?.[x] || '__';
            const tileDef = tileDefinitions.tiles[code];

            if (!tileDef) {
                console.warn(`Warning: Unknown tile code "${code}" at (${x}, ${y})`);
                continue;
            }

            if (tileDef.terrainCardId === null) continue;

            // 出口タイル（X1）を検出
            if (code === 'X1') {
                exitPosition = { x, y };
            }

            const tile = {
                id: `t_${x}_${y}`,
                x,
                y,
                terrainCardId: tileDef.terrainCardId,
                isTraversable: tileDef.traversable
            };

            if (tileDef.name) tile.name = tileDef.name;
            if (tileDef.buildingType) tile.buildingType = tileDef.buildingType;
            if (tileDef.npcType) tile.npcType = tileDef.npcType;
            if (tileDef.itemType) tile.itemType = tileDef.itemType;
            if (tileDef.enemyType) tile.enemyType = tileDef.enemyType;

            tiles.push(tile);
        }
    }

    // startPosition: 出口があれば1マス上、なければマップ中央
    let startX, startY;
    if (exitPosition) {
        startX = exitPosition.x;
        startY = Math.max(0, exitPosition.y - 1); // 出口の1マス上
    } else {
        startX = Math.floor(width / 2);
        startY = Math.floor(height / 2);
    }

    const mapJson = {
        mapId,
        name: mapName,
        grid: { width, height },
        tiles,
        startPosition: { x: startX, y: startY }
    };

    if (options.type) mapJson.type = options.type;
    if (options.bgm) mapJson.bgm = options.bgm;

    return mapJson;
}

// メイン処理
function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log('Usage: node scripts/csvToMapJson.cjs <csv_file> <output_json> [mapId] [mapName]');
        process.exit(1);
    }

    const [csvPath, outputPath, mapId, mapName] = args;
    const finalMapId = mapId || path.basename(csvPath, '.csv');
    const finalMapName = mapName || finalMapId;

    try {
        const mapJson = convertCsvToMapJson(csvPath, finalMapId, finalMapName, {});

        fs.writeFileSync(outputPath, JSON.stringify(mapJson, null, 4));
        console.log(`✅ Converted: ${csvPath} -> ${outputPath}`);
        console.log(`   Grid: ${mapJson.grid.width}x${mapJson.grid.height}`);
        console.log(`   Tiles: ${mapJson.tiles.length}`);
        console.log(`   StartPos: (${mapJson.startPosition.x}, ${mapJson.startPosition.y})`);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
