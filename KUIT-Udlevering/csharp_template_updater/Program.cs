using System;
using System.IO;
using System.Linq;

class Program
{
    public static void Main(string[] args)
    {
        string parentDir = Directory.GetCurrentDirectory();

        string ifile = Path.Combine(parentDir, "template.txt");
        string ofile = Path.Combine(parentDir, "template.css");

        Console.WriteLine("Reading from: {0}", ifile);
        string[] text = readFile(ifile);
        Console.WriteLine("Formatting text");
        string newText = updateText(text);
        Console.WriteLine("Writing to: {0}", ofile);
        writeFile(ofile, newText);
        Console.WriteLine("Success");
    }

    private static string[] readFile(string filePath)
    {
        return File.ReadAllLines(filePath);
    }

    private static string updateText(string[] oldtext)
    {
        string[] updatedtext = oldtext.Select(
            line => "\t\t\"" + line + "\\A" + "\""
        ).ToArray();

        string prefix = "#secretText::before {\n\tdisplay: none;\n\tcontent:\n";
        string suffix = "\n\t\t;\n\t}";

        return prefix + String.Join("\n", updatedtext) + suffix;
    }

    private static void writeFile(string filePath, string updatedtext)
    {
        using (StreamWriter writer = new StreamWriter(filePath))
        {
            writer.WriteLine(updatedtext);
        }
    }
}