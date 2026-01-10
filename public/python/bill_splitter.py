total = float(total_bill)
num_people = int(people)
tip = int(tip)

tip_amount = (tip / 100) * total
total_with_tip = total + tip_amount
amount_per_person = total_with_tip / num_people

print(f"Total bill with tips: ${total_with_tip:.2f}")
print(f"Each person should pay: ${amount_per_person:.2f}")