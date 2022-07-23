#include <iostream>
#include <fstream>
#include <sstream>

std::string updateString (std::string str, std::string sub, std::string newsub)
{
  std::string output = "";

  size_t bottom = 0;
  size_t top = str.find (sub, bottom);
  while (top != std::string::npos)
    {
      output = output + str.substr (bottom, top - bottom) + newsub;
      bottom = top + sub.length ();
      top = str.find (sub, bottom);
    }

  return output + str.substr (bottom, str.length () - bottom);
}

int main () 
{
  std::string prefix = "#secretText::before {\n\tdisplay: none;\n\tcontent:\n\t\t\"";
  std::string suffix = "\"\n\t\t;\n\t}";

  std::ifstream t("template.txt");
  std::stringstream testText;
  testText << t.rdbuf ();
  
  std::string content = updateString (testText.str (), "\n", "\\A\"\n\t\t\"");
  std::cout << testText.str();

  std::ofstream s("template.css");
  s << prefix << content << suffix;
  s.close ();

  return 0;
}
