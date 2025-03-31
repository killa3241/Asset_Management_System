package util;

public class ValidationUtil {
    public static boolean isValidInput(String input) {
        return input != null && !input.trim().isEmpty();
    }
}
