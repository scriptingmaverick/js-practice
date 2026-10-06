class SpaceCraft {
  public int calcualteFuelRequired(int mass) {
    return Math.round(mass / 3) - 2;
  }
}

public class Day1 {
  public static void main(String[] a) {
    SpaceCraft sc = new SpaceCraft();

    System.out.println("For m = 12 : " + sc.calcualteFuelRequired(12));

    System.out.println("For m = 14 : " + sc.calcualteFuelRequired(14));
    
    System.out.println("For m = 1969 : " + sc.calcualteFuelRequired(1969));

    System.out.println("For m = 100756 : " + sc.calcualteFuelRequired(100756));
  }
}