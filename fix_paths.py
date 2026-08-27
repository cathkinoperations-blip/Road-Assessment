import os

# Define the path to your public folder
public_dir = "./public"

def fix_html_paths():
    if not os.path.exists(public_dir):
        print(f"Error: Directory '{public_dir}' not found. Make sure you are running this from your project root.")
        return

    count = 0
    # Walk through all files and subfolders under public
    for root, dirs, files in os.walk(public_dir):
        for file in files:
            if file.lower().endswith(".html"):
                file_path = os.path.join(root, file)
                
                # Read the content of the HTML file
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Replace relative image references with root-absolute references
                # This handles href="images/..." and src="images/..."
                updated_content = content.replace('href="images/', 'href="/images/')
                updated_content = updated_content.replace('src="images/', 'src="/images/')
                updated_content = updated_content.replace("href='images/", "href='/images/")
                updated_content = updated_content.replace("src='images/", "src='/images/")
                
                # Only write back if changes were actually made
                if content != updated_content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(updated_content)
                    print(f"Updated paths in: {file_path}")
                    count += 1

    print(f"\nDone! Successfully updated {count} HTML file(s) inside the public folder.")

if __name__ == "__main__":
    fix_html_paths()