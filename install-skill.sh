#!/bin/bash

# UI Design Skill安装脚本
echo "正在安装UI Design Skill..."

# 检查目标目录是否存在
SKILLS_DIR="$HOME/.agent-skills/skills"
TARGET_DIR="$SKILLS_DIR/development/uidesign"

# 创建目录结构
mkdir -p "$SKILLS_DIR/development/uidesign"

# 复制必要文件
echo "复制技能文件..."
cp -r design "$TARGET_DIR/"
cp SKILL.md "$TARGET_DIR/"
cp README.md "$TARGET_DIR/"
cp skill-manifest.json "$TARGET_DIR/"

# 更新skills.json (需要手动操作)
echo "请手动更新 $HOME/.agent-skills/skills.json 文件："
echo ""
echo "在 \"skills\" 数组中添加以下条目："
echo "{
  \"name\": \"uidesign\",
  \"display_name\": \"UI Design & Frontend Standards\",
  \"description\": \"Unified design system and frontend development standards for all business systems.\",
  \"category\": \"development\",
  \"subcategory\": null,
  \"path\": \"skills/development/uidesign/skill.md\",
  \"install_path\": \"skills/development/uidesign/\",
  \"version\": \"1.0.0\",
  \"tags\": [
    \"ui-design\",
    \"frontend\",
    \"design-system\",
    \"component-library\"
  ]
}"
echo ""
echo "安装完成！技能已安装到: $TARGET_DIR"
echo ""
echo "使用方法："
echo "1. 当需要创建UI界面时，AI助手会自动识别并使用此技能"
echo "2. 技能文件在: $TARGET_DIR/SKILL.md"
echo "3. 组件库在: $TARGET_DIR/design/"