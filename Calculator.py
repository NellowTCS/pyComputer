def main():
    while True:
        values = []
        try:
            amount_of_values = float(input("How many values would you like to calculate with? (0 to exit)"))
            if amount_of_values == 0:
                break

            while amount_of_values > 0:
                try:
                    number = float(input("Enter a number: "))
                    values.append(number)
                    amount_of_values -= 1
                except ValueError:
                    print("Please enter a number (no spaces).")

            operation(values)

        except ValueError:
            print("Please enter a number (no spaces).")


def operation(values):
    if len(values) == 0:
        print("Goodbye!")
        return

    total = values[0]
    for i in range(1, len(values)):
        while True:
            a_s_m_d = input("Enter an operation (Add, Subtract, Multiply, or Divide): ").upper()
            if a_s_m_d in ("ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"):
                if a_s_m_d == "ADD":
                    total += values[i]
                elif a_s_m_d == "SUBTRACT":
                    total -= values[i]
                elif a_s_m_d == "MULTIPLY":
                    total *= values[i]
                else:
                    total /= values[i]
                break
            else:
                print("Invalid operation. Please enter Add, Subtract, Multiply, or Divide.")
    print("Result:", total)
