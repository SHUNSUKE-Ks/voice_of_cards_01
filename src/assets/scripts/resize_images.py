
import os
from PIL import Image, ImageOps

target_dir = r"c:\Users\enjoy\AppPJ02\voice_of_cards_01\docs\design\CardFreame"
target_size = (744, 1024)

def process_image(file_path):
    try:
        img = Image.open(file_path)
        print(f"Processing {file_path}...")
        
        # 1. Provide option to strip margins (Auto-crop)
        # Convert to RGB to ensure getbbox works if it was somehow palette based, though JPEGs are usually RGB.
        if img.mode != 'RGB':
            img = img.convert('RGB')
            
        # Simple auto-crop: Invert image effectively to identify content vs background if background is light.
        # However, "remove margins" is ambiguous. Let's try to crop to bounding box of content.
        # If the border is solid color, getbbox() on inverted image (if white bg) or direct (if black bg) works.
        # Let's try ImageOps.crop? No, .getbbox() is better.
        # We will assume background is the color of the top-left pixel.
        
        bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
        diff = Image.frombytes(img.mode, img.size, bytes([a ^ b for a, b in zip(img.tobytes(), bg.tobytes())]))
        diff = diff.convert('L') # Convert to grayscale
        # Threshold? Or just getbbox?
        # getbbox returns the bounding box of non-zero regions.
        bbox = diff.getbbox()
        
        if bbox:
            print(f"  Cropping to {bbox}")
            img = img.crop(bbox)
        
        # 2. Resize
        # Use LANCZOS for high quality downsampling/upsampling
        img_resized = img.resize(target_size, Image.Resampling.LANCZOS)
        
        # 3. Save as PNG
        file_name = os.path.basename(file_path)
        name, ext = os.path.splitext(file_name)
        new_name = f"{name}_744x1024.png"
        save_path = os.path.join(target_dir, new_name)
        
        img_resized.save(save_path, "PNG")
        print(f"  Saved to {save_path}")

    except Exception as e:
        print(f"  Error processing {file_path}: {e}")

files = [f for f in os.listdir(target_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]

for f in files:
    # Skip already processed files if they exist to avoid re-processing outputs
    if "_744x1024" in f:
        continue
    process_image(os.path.join(target_dir, f))
