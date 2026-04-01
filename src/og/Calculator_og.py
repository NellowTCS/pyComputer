def main(yes_no):
    while yes_no is True:
        values = []
        try:
            amount_of_values = float(input("How many values would you like to calculate with? (0 to exit)"))
            if amount_of_values == 0:
                return
            while amount_of_values != 0:
                try:
                    number = float(input("Enter a number."))
                    values.append(number)
                    amount_of_values -= 1
                except ValueError:
                    print("Enter only numbers (no spaces)!")
                    main(yes_no)
        except ValueError:
            print("Enter a number (no spaces)!")
            main(yes_no)

        operation(values)

    yes_no = False


def operation(values):
    total = values[0]
    num_amount = len(values)
    values_new = values[1: num_amount]

    if len(values) > 2:
        for i in values_new:
            a_s_m_d = input("Enter an operation (Add, Subtract, Multiply, or Divide):")
            if a_s_m_d.upper() == "ADD":
                total += i
            elif a_s_m_d.upper() == "SUBTRACT":
                total -= i
            elif a_s_m_d.upper() == "MULTIPLY":
                total *= i
            elif a_s_m_d.upper() == "DIVIDE":
                total /= i
            else:
                print("no try again")
                return
    elif len(values) == 2:

        a_s_m_d = input("Enter an operation (Add, Subtract, Multiply, or Divide): ")
        if a_s_m_d.upper() == "ADD":
            total = values[0] + values[1]
        elif a_s_m_d.upper() == "SUBTRACT":
            total = values[0] - values[1]
        elif a_s_m_d.upper() == "MULTIPLY":
            total = values[0] * values[1]
        elif a_s_m_d.upper() == "DIVIDE":
            total = values[0] / values[1]
        else:
            print("Enter a valid operation.")
            return
    elif len(values) == 1:
        total = values[0]
    else:
        print("Goodbye!")
        return
    print("Result:", total)
