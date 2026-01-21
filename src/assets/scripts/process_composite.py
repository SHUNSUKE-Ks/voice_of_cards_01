
import os
from PIL import Image
import math

def remove_white_background(img, threshold=240):
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # item is (R, G, B, A)
        # Check if pixel is "white enough"
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            newData.append((255, 255, 255, 0)) # Make transparent
        else:
            newData.append(item)
    
    img.putdata(newData)
    return img

def main():
    base_dir = r"c:\Users\enjoy\AppPJ02\voice_of_cards_01\docs"
    char_path = os.path.join(base_dir, r"design\img\Sample画像\ch_hero_normal (1).png")
    frame_path = os.path.join(base_dir, r"design\CardFreame\Card01_744x1024.png")
    output_transparent_path = os.path.join(base_dir, r"design\img\Sample画像\ch_hero_transparent.png")
    output_composite_path = os.path.join(base_dir, r"design\img\Sample画像\test_layer_composite.png")

    print(f"Loading character: {char_path}")
    char_img = Image.open(char_path)
    
    print("Removing white background...")
    # Using a simple threshold since rembg might not be available
    # For complex edges this is rough, but good for a quick test
    char_transparent = remove_white_background(char_img, threshold=230)
    
    print(f"Saving transparent character to: {output_transparent_path}")
    char_transparent.save(output_transparent_path, "PNG")

    print(f"Loading frame: {frame_path}")
    frame_img = Image.open(frame_path).convert("RGBA")
    
    # Resize char to fit frame if needed?
    # Frame is 744x1024. Character is probably square or different aspect.
    # Let's preserve aspect ratio of character and fit it nicely.
    # Usually characters in Voice of Cards are inside the frame.
    
    print("Compositing...")
    # Center the character
    bg_w, bg_h = frame_img.size
    ch_w, ch_h = char_transparent.size
    
    # Scale character relative to frame? 
    # Let's say we want char to render within 80% of width
    desired_w = int(bg_w * 0.8)
    ratio = desired_w / ch_w
    desired_h = int(ch_h * ratio)
    
    char_resized = char_transparent.resize((desired_w, desired_h), Image.Resampling.LANCZOS)
    
    # Position: Centered horizontally, slightly up from bottom?
    # Voice of cards usually has them in the upper/mid section. 
    # Let's just center it for the test.
    offset_x = (bg_w - desired_w) // 2
    offset_y = (bg_h - desired_h) // 2
    
    # Paste using alpha channel as mask
    frame_img.paste(char_resized, (offset_x, offset_y), char_resized)
    
    print(f"Saving composite test to: {output_composite_path}")
    frame_img.save(output_composite_path, "PNG")
    print("Done!")

if __name__ == "__main__":
    main()
