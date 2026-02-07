#!/bin/bash
# Image Migration Script
# Copies and renames images from ../data/ to public/images/
# Converts "name (number).ext" format to "name-number.ext"

SOURCE_DIR="../data"
DEST_BASE="public/images"

# Create directories
mkdir -p "$DEST_BASE/site"
mkdir -p "$DEST_BASE/projects/keyboard"
mkdir -p "$DEST_BASE/projects/capstone"
mkdir -p "$DEST_BASE/projects/qatools"
mkdir -p "$DEST_BASE/projects/trebuchet"
mkdir -p "$DEST_BASE/projects/printer"
mkdir -p "$DEST_BASE/projects/greenhouse"
mkdir -p "$DEST_BASE/projects/dogapult"
mkdir -p "$DEST_BASE/projects/miscellaneous"
mkdir -p "$DEST_BASE/projects/supercheesi"
mkdir -p "public/files"

# Copy site images
cp "$SOURCE_DIR/me.webp" "$DEST_BASE/site/me.webp" 2>/dev/null
cp "$SOURCE_DIR/resume.webp" "$DEST_BASE/site/resume.webp" 2>/dev/null
cp "$SOURCE_DIR/diploma.webp" "$DEST_BASE/site/diploma.webp" 2>/dev/null

# Copy files
cp "$SOURCE_DIR/resume.pdf" "public/files/resume.pdf" 2>/dev/null
cp "$SOURCE_DIR/ATS Resume.pdf" "public/files/ATS_Resume.pdf" 2>/dev/null

# Function to copy and rename project images
# Converts "name (number).ext" to "name-number.ext"
migrate_project() {
    local prefix="$1"
    local dest_dir="$2"

    for file in "$SOURCE_DIR/$prefix"*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            # Replace " (" with "-" and remove trailing ")"
            newname=$(echo "$filename" | sed 's/ (\(.*\))\./\-\1./g' | sed 's/ /-/g')
            cp "$file" "$dest_dir/$newname"
            echo "  $filename -> $newname"
        fi
    done
}

echo "Migrating keyboard images..."
migrate_project "keyboard" "$DEST_BASE/projects/keyboard"

echo "Migrating capstone images..."
migrate_project "capstone" "$DEST_BASE/projects/capstone"

echo "Migrating qatools images..."
migrate_project "qatools" "$DEST_BASE/projects/qatools"

echo "Migrating trebuchet images..."
migrate_project "trebuchet" "$DEST_BASE/projects/trebuchet"
# Also copy equation images
migrate_project "trebuchet_eq" "$DEST_BASE/projects/trebuchet"

echo "Migrating printer images..."
migrate_project "printer" "$DEST_BASE/projects/printer"

echo "Migrating greenhouse images..."
migrate_project "greenhouse" "$DEST_BASE/projects/greenhouse"

echo "Migrating dogapult images..."
migrate_project "dogapult" "$DEST_BASE/projects/dogapult"

echo "Migrating supercheesi images..."
migrate_project "supercheesi" "$DEST_BASE/projects/supercheesi"

# Miscellaneous project images (different prefix patterns)
echo "Migrating miscellaneous images..."
for prefix in bedframe bench_psu controller_hanger dice_box disc_charger drill_press headphone_holder rotary_encoder shave_stand silverware_tray silverware_try underquilt; do
    migrate_project "$prefix" "$DEST_BASE/projects/miscellaneous"
done

# Copy video if exists
if [ -f "$SOURCE_DIR/capstone_demo.mp4" ]; then
    mkdir -p "public/videos"
    cp "$SOURCE_DIR/capstone_demo.mp4" "public/videos/capstone_demo.mp4"
    echo "Copied capstone_demo.mp4"
fi

echo ""
echo "Migration complete!"
echo "Total files in public/images:"
find "$DEST_BASE" -type f | wc -l
