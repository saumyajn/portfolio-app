w_lbs = float(weight)
h_ft = float(height_ft)
h_in = float(height_in)

total_inches = (h_ft * 12) + h_in
# BMI Formula: 703 x weight (lbs) / [height (in)]^2
bmi = 703 * w_lbs / (total_inches * total_inches)

print(f"BMI (Standard): {bmi:.2f}")
# ... add category logic here
if bmi < 18.5:
    print("Category: Underweight")
elif 18.5 <= bmi < 25:
    print("Category: Normal weight")
elif 25 <= bmi < 30:
    print("Category: Overweight")
else:
    print("Category: Obese")
