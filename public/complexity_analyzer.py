import ast

# Grab the code directly from the Monaco Editor input
code_to_parse = user_code if "user_code" in globals() else ""

if not code_to_parse.strip():
    print("Welcome to the Big-O Code Analyzer! 🔍")
    print("---------------------------------------")
    print("Please paste some valid Python code into the editor above and hit Run.")
else:
    try:
        tree = ast.parse(code_to_parse)

        def get_max_depth(node, current_depth=0):
            max_depth = current_depth
            for child in ast.iter_child_nodes(node):
                if isinstance(
                    child, (ast.For, ast.While, ast.ListComp, ast.DictComp, ast.SetComp)
                ):
                    child_depth = get_max_depth(child, current_depth + 1)
                    max_depth = max(max_depth, child_depth)
                else:
                    child_depth = get_max_depth(child, current_depth)
                    max_depth = max(max_depth, child_depth)
            return max_depth

        depth = get_max_depth(tree)

        print("🔍 --- Big-O Complexity Analysis --- 🔍\n")

        if depth == 0:
            print("Estimated Time Complexity: O(1) or O(N)")
            print(
                "Reason: No loops were detected. \n(Note: Native Python functions under the hood may still be O(N))."
            )
        elif depth == 1:
            print("Estimated Time Complexity: O(N) [Linear]")
            print(
                "Reason: Found a single loop. Execution time scales linearly with the input."
            )
        elif depth == 2:
            print("Estimated Time Complexity: O(N^2) [Quadratic]")
            print(
                "Reason: Found nested loops (depth of 2). Typical for algorithms like Bubble Sort."
            )
        elif depth == 3:
            print("Estimated Time Complexity: O(N^3) [Cubic]")
            print(
                "Reason: Found deeply nested loops (depth of 3). Watch out for bottlenecks!"
            )
        else:
            print(f"Estimated Time Complexity: O(N^{depth})")
            print(
                "Reason: Found extremely deep nesting. You should definitely optimize this code."
            )

        print("\n✅ Code parsed and analyzed successfully.")

    except SyntaxError as e:
        print(
            f"❌ Syntax Error: Could not parse the provided code snippet.\nDetails: {e}"
        )
    except Exception as e:
        print(f"⚠️ An error occurred during analysis:\n{e}")
