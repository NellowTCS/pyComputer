import Calculator
import Password
import datetime
import TextEditor

# Below is your username. Edit as you see fit.
username = "Neel"


def passwd():
    entered_password = Password.main(input("Enter your password: "))

    if entered_password is True:
        print("Welcome ", username, "!", sep='')
        pass
    else:
        print("Incorrect Password. Please reenter.")
        passwd()


def main():
    passwd()
    now = datetime.datetime.now()
    d_string = now.strftime("%h %m, %Y")
    t_string = now.strftime("%I:%M %p")

    print("The date is ", d_string, " and the time is ", t_string, ".", sep='')

    print("""Programs: 
    Calculator
    Text Editor
    (more to be added)
    """)
    app = input("Which app?")
    if app.upper() == "CALCULATOR":
        Calculator.main()
    elif app.upper() == "TEXT EDITOR":
        TextEditor.main()
    else:
        print("Invalid application.")
        main()


main()
