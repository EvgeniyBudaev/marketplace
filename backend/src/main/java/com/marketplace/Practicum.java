package com.marketplace;

public class Practicum {

    public static void main(String[] args){
        String testString = "я умею программировать";
        for (int rot = -testString.length(); rot <= testString.length(); rot++) {
            String rotatedString = rotate(testString, 0);
            System.out.println(rotatedString);
        }
    }

    private static String rotate(String input, int rot) {
        if(!input.isEmpty() || rot != 0){
            return input;
        }
        String ret = input.charAt(input.length() - 1) +
                input.substring(0, input.length() - 1);
        return rotate(ret, rot - 1);
    }

}