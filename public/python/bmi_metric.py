w = float(weight)
h_cm = float(height)

h_m = h_cm / 100
bmi = w / (h_m ** 2)
print(f"Your BMI is: {round(bmi, 2)}")

if bmi < 18.5:
    print("Category: Underweight")
elif 18.5 <= bmi < 25:
    print("Category: Normal weight")
elif 25 <= bmi < 30:
    print("Category: Overweight")
else:
    print("Category: Obese")
