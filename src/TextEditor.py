import os.path


def delete_by_line_number(file_name, line_number):
    """Deletes the specified line number from the file."""
    try:
        with open(file_name, "r") as file:
            lines = file.readlines()

        if line_number > len(lines):
            print(f"Line number {line_number} is out of range.")
            return

        del lines[line_number - 1]  # Lines are zero-indexed, so adjust for that

        with open(file_name, "w") as file:
            file.writelines(lines)
        print(f"Line {line_number} deleted from '{file_name}'.")
    except FileNotFoundError:
        print(f"File '{file_name}' does not exist.")


def delete_by_text(file_name, text_to_delete):
    """Deletes lines containing the specified text from the file."""
    try:
        with open(file_name, "r") as file:
            lines = file.readlines()

        new_lines = [line for line in lines if text_to_delete not in line]

        if len(new_lines) == len(lines):
            print(f"No lines containing '{text_to_delete}' were found.")
            return

        with open(file_name, "w") as file:
            file.writelines(new_lines)
        print(f"Lines containing '{text_to_delete}' deleted from '{file_name}'.")
    except FileNotFoundError:
        print(f"File '{file_name}' does not exist.")


def display_file_contents(file_name):
    """Opens the file, reads its contents, and displays a preview."""
    with open(file_name, "r") as opened_file:
        file_contents = opened_file.read()
    print(f"\nName: {file_name}\n*****************************\n{file_contents}\n*****************************")


def main():
    while True:
        user_choice = input("Would you like to edit, read, delete, or create a file? "
                            "(Enter Edit, Read, Delete, or Create)"
                            "(to exit, enter Exit): ").upper()

        if user_choice == "EDIT":
            file_name = input("Enter the name of the file (case-sensitive and with file extension!): ")
            if not os.path.isfile(file_name):
                print(f"File '{file_name}' does not exist.")
                continue

            with open(file_name, "a") as file:
                file.write(input("What would you like to write? "))

            display_file_contents(file_name)

        elif user_choice == "READ":
            file_name = input("Enter the name of the file (case-sensitive and with file extension!): ")
            if not os.path.isfile(file_name):
                print(f"File '{file_name}' does not exist.")
                continue

            display_file_contents(file_name)

        elif user_choice == "CREATE":
            file_name = input("Enter the name of the file (case-sensitive and with file extension!): ")
            try:
                with open(file_name, "x") as new_file:
                    pass  # File created successfully
                write_to_file = input("Would you like to write to the file? (Enter Yes or No) ").upper()
                if write_to_file == "YES":
                    with open(file_name, "a") as new_file:
                        new_file.write(input("What would you like to write? "))
                    display_file_contents(file_name)
            except FileExistsError:
                print(f"File '{file_name}' already exists.")

        elif user_choice == "DELETE":
            file_name = input("Enter the name of the file (case-sensitive and with file extension!): ")
            if not os.path.isfile(file_name):
                print(f"File '{file_name}' does not exist.")
                continue

            # Implement deletion logic here
            delete_mode = input("Delete by line number (number) or by containing text (text)? ").upper()
            if delete_mode == "NUMBER":
                line_number = int(input("Enter the line number to delete: "))
                delete_by_line_number(file_name, line_number)
            elif delete_mode == "TEXT":
                text_to_delete = input("Enter the text to delete (contents of the entire line): ")
                delete_by_text(file_name, text_to_delete)
            else:
                print("Invalid deletion mode. Please choose 'number' or 'text'.")

        elif user_choice == "EXIT":
            return
        else:
            print("You did not enter one of the three options. Please try again.")
