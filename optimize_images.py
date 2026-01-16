#!/usr/bin/env python3
"""
Image Optimization Script for Portfolio
Optimizes JPEG and PNG images to reduce file size while maintaining quality.
Run this script manually after adding new images to the portfolio.
"""

import os
import sys
from pathlib import Path
from PIL import Image
import argparse


# Default settings
DEFAULT_QUALITY = 85  # JPEG quality (1-100)
DEFAULT_PNG_OPTIMIZE = True  # Enable PNG optimization
DEFAULT_WEBP_QUALITY = 85  # WebP quality (1-100)
DEFAULT_MAX_WIDTH = 1920  # Maximum image width
DEFAULT_MAX_HEIGHT = 1920  # Maximum image height


def get_image_files(directory, recursive=True):
    """Find all image files in the directory."""
    image_extensions = {'.jpg', '.jpeg', '.png', '.webp'}
    image_files = []

    path = Path(directory)
    if recursive:
        for ext in image_extensions:
            image_files.extend(path.rglob(f'*{ext}'))
            image_files.extend(path.rglob(f'*{ext.upper()}'))
    else:
        for ext in image_extensions:
            image_files.extend(path.glob(f'*{ext}'))
            image_files.extend(path.glob(f'*{ext.upper()}'))

    return sorted(image_files)


def optimize_image(image_path, quality=85, png_optimize=True, max_width=1920, max_height=1920,
                   convert_to_webp=False, backup=False, dry_run=False):
    """
    Optimize a single image file.

    Args:
        image_path: Path to the image file
        quality: JPEG/WebP quality (1-100)
        png_optimize: Enable PNG optimization
        max_width: Maximum width (resize if larger)
        max_height: Maximum height (resize if larger)
        convert_to_webp: Convert to WebP format
        backup: Create backup of original
        dry_run: Don't actually modify files

    Returns:
        Tuple of (original_size, optimized_size, success)
    """
    try:
        original_size = os.path.getsize(image_path)

        # Open image
        img = Image.open(image_path)

        # Convert RGBA to RGB for JPEG
        if img.mode in ('RGBA', 'LA', 'P') and not convert_to_webp:
            if image_path.suffix.lower() in ['.jpg', '.jpeg']:
                # Create white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background

        # Resize if needed
        width, height = img.size
        if width > max_width or height > max_height:
            img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
            print(f"  Resized from {width}x{height} to {img.size[0]}x{img.size[1]}")

        if dry_run:
            print(f"  [DRY RUN] Would optimize: {image_path}")
            return original_size, original_size, True

        # Create backup if requested
        if backup:
            backup_path = image_path.with_suffix(image_path.suffix + '.bak')
            if not backup_path.exists():
                import shutil
                shutil.copy2(image_path, backup_path)
                print(f"  Created backup: {backup_path.name}")

        # Determine output path and format
        if convert_to_webp:
            output_path = image_path.with_suffix('.webp')
            save_kwargs = {
                'format': 'WEBP',
                'quality': quality,
                'method': 6  # Best compression
            }
        elif image_path.suffix.lower() in ['.jpg', '.jpeg']:
            output_path = image_path
            save_kwargs = {
                'format': 'JPEG',
                'quality': quality,
                'optimize': True,
                'progressive': True
            }
        elif image_path.suffix.lower() == '.png':
            output_path = image_path
            save_kwargs = {
                'format': 'PNG',
                'optimize': png_optimize
            }
        else:
            output_path = image_path
            save_kwargs = {}

        # Save optimized image
        img.save(output_path, **save_kwargs)

        optimized_size = os.path.getsize(output_path)

        # Delete original if converting to WebP
        if convert_to_webp and output_path != image_path:
            os.remove(image_path)
            print(f"  Converted to WebP: {output_path.name}")

        return original_size, optimized_size, True

    except Exception as e:
        print(f"  ERROR: {e}")
        return 0, 0, False


def format_size(size_bytes):
    """Format bytes to human-readable size."""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.2f} TB"


def main():
    parser = argparse.ArgumentParser(description='Optimize images for the portfolio')
    parser.add_argument('directory', nargs='?', default='data',
                        help='Directory to optimize (default: data)')
    parser.add_argument('-q', '--quality', type=int, default=DEFAULT_QUALITY,
                        help=f'JPEG/WebP quality 1-100 (default: {DEFAULT_QUALITY})')
    parser.add_argument('--max-width', type=int, default=DEFAULT_MAX_WIDTH,
                        help=f'Maximum width in pixels (default: {DEFAULT_MAX_WIDTH})')
    parser.add_argument('--max-height', type=int, default=DEFAULT_MAX_HEIGHT,
                        help=f'Maximum height in pixels (default: {DEFAULT_MAX_HEIGHT})')
    parser.add_argument('--webp', action='store_true',
                        help='Convert images to WebP format')
    parser.add_argument('--backup', action='store_true',
                        help='Create backup of original files')
    parser.add_argument('--no-png-optimize', action='store_true',
                        help='Disable PNG optimization')
    parser.add_argument('--dry-run', action='store_true',
                        help="Show what would be done without modifying files")
    parser.add_argument('--non-recursive', action='store_true',
                        help='Only process files in the specified directory (not subdirectories)')

    args = parser.parse_args()

    # Validate directory
    if not os.path.isdir(args.directory):
        print(f"Error: Directory '{args.directory}' not found")
        sys.exit(1)

    # Find images
    print(f"Scanning for images in '{args.directory}'...")
    image_files = get_image_files(args.directory, recursive=not args.non_recursive)

    if not image_files:
        print("No image files found.")
        sys.exit(0)

    print(f"Found {len(image_files)} images\n")

    if args.dry_run:
        print("=== DRY RUN MODE - No files will be modified ===\n")

    # Process each image
    total_original = 0
    total_optimized = 0
    success_count = 0

    for i, image_path in enumerate(image_files, 1):
        # Skip if file no longer exists (may have been converted already)
        if not image_path.exists():
            continue

        print(f"[{i}/{len(image_files)}] Processing: {image_path}")

        original, optimized, success = optimize_image(
            image_path,
            quality=args.quality,
            png_optimize=not args.no_png_optimize,
            max_width=args.max_width,
            max_height=args.max_height,
            convert_to_webp=args.webp,
            backup=args.backup,
            dry_run=args.dry_run
        )

        if success:
            total_original += original
            total_optimized += optimized
            success_count += 1

            if not args.dry_run:
                savings = original - optimized
                savings_pct = (savings / original * 100) if original > 0 else 0
                print(f"  {format_size(original)} → {format_size(optimized)} "
                      f"(saved {format_size(savings)}, {savings_pct:.1f}%)")

        print()

    # Print summary
    print("=" * 60)
    print("OPTIMIZATION SUMMARY")
    print("=" * 60)
    print(f"Images processed: {success_count}/{len(image_files)}")

    if not args.dry_run and success_count > 0:
        total_savings = total_original - total_optimized
        savings_pct = (total_savings / total_original * 100) if total_original > 0 else 0
        print(f"Total original size: {format_size(total_original)}")
        print(f"Total optimized size: {format_size(total_optimized)}")
        print(f"Total saved: {format_size(total_savings)} ({savings_pct:.1f}%)")

    print("=" * 60)


if __name__ == '__main__':
    main()
