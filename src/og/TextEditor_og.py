import os.path


def main():
    w_r_e_n = input("Would you like to edit, read, or create a file? (Enter Edit, Read, or Create): ")

    if w_r_e_n.upper() == "EDIT":

        name_of_file_e = input("Enter the name of the file (case-sensitive and with file extension!): ")

        if os.path.isfile(name_of_file_e):
            file = open(name_of_file_e, "a")
            file.write(input("What would you like to write? "))
            file.close()

            close_file = open(name_of_file_e, "r")
            preview = close_file.read()
            print("""
                  Preview:
                  *****************************
                  """,
                  preview,
                  """
                  *****************************
                  """)
        else:
            print("File does/doesn't exist.")
            main()

    elif w_r_e_n.upper() == "READ":
        name_of_file_r = input("Enter the name of the file (case-sensitive and with file extension!): ")
        opened_file = open(name_of_file_r, "r")
        file_opened = opened_file.read()
        print("""
              Name:""", name_of_file_r,
              """        
              *****************************
              """,
              file_opened,
              """
              *****************************
              """)

    elif w_r_e_n.upper() == "CREATE":
        name_of_file_c = input("Enter the name of the file (case-sensitive and with file extension!): ")
        try:
            new_file = open(name_of_file_c, "x")
            read_write = input("Would you like to write to the file? (Enter Yes or No) ")
            new_file.close()

            if read_write.upper() == "YES":
                new_file = open(name_of_file_c, "a")
                new_file.write(input("What would you like to write? "))
                new_file.close()

                close_file = open(name_of_file_c, "r")
                preview = close_file.read()
                print("""
                      Preview:
                      *****************************
                      """,
                      preview,
                      """
                      *****************************
                      """)
        except FileExistsError:
            print("The file exists.")
            main()

    else:
        print("You did not enter one of the three options.")
        main()


main()
