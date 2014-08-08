describe("Email cleanEmailsInator", function(){

  describe("Returns text filtered", function(){

    it("Returns empty string if given an empty string", function() {
      expect(cleanEmailsIn("")).toBe("");
    });

    it("Returns the same word if given a word", function() {
      expect(cleanEmailsIn("Peter")).toBe("Peter");
    });

    it("Returns a email when a email camouflaged which has a (AT) instead of @", function() {
      expect(cleanEmailsIn("lalala(AT)gmail.com")).toBe("lalala@gmail.com");
    });

    it("Returns a email when a email camouflaged which has (AT) and (DOT) instead of @ and .", function() {
      expect(cleanEmailsIn("lalala(AT)gmail(DOT)com")).toBe("lalala@gmail.com");
    });

    it("Returns (AT) when the input it's only (AT) as a string", function() {
      expect(cleanEmailsIn("(AT)")).toBe("(AT)");
    });

    it ("Returns a email when a email camouflaged which has -AT- and -DOT- instead of @ and .", function() {
      expect(cleanEmailsIn("   hhs   lalala-AT-gmail-DOT-com")).toBe("   hhs   lalala@gmail.com");
    });

    it ("returns the input text without change when the combination of -AT- and -DOT- is not an valid email", function() {
      expect(cleanEmailsIn("   hhs   lalala-AT--DOT-com")).toBe("   hhs   lalala-AT--DOT-com");
    }); 

    it("Doesn't Transform (AT) and (DOT) when . is before @", function() {
      expect(cleanEmailsIn("lalala(DOT)gmail(AT)com")).toBe("lalala(DOT)gmail(AT)com");
    });

    it("It doesn't Transform the text if they is only one DOT", function() {
      expect(cleanEmailsIn("lalala(DOT)gmail")).toBe("lalala(DOT)gmail");
    });

    it("Transform (AT) and (DOT) to @ and .", function() {
      expect(cleanEmailsIn("la(DOT)lala(AT)gmail(DOT)com")).toBe("la.lala@gmail.com");
    });

    it("Transform not change DOT or AT in text who is not an email", function() {
      expect(cleanEmailsIn("Hi my name is ATDOT")).toBe("Hi my name is ATDOT");
    });

    it("Transform change DOT or AT in text who is not an email", function() {
      expect(cleanEmailsIn("Hi my la(DOT)lala(AT)gmail(DOT)com name is ATDOT la(DOT)lala(AT)gmail(DOT)com")).toBe("Hi my la.lala@gmail.com name is ATDOT la.lala@gmail.com");
    });

    it("not clean an email who has 2 DOT after the at", function() {
      expect(cleanEmailsIn("lalaDOTlala2-AT-hdhdh-DOT-gmail-DOT-com")).toBe("lalaDOTlala2-AT-hdhdh-DOT-gmail-DOT-com");
    });
  });

  describe("Testing the dom", function() {

    var inputBox, resultBox, button;

    beforeEach(function(){
        inputBox = $("#input-text");
        resultBox = $("#cleaned-text");
        button = $("#clean-button");
    });

    it("cleans the input text", function() {
      the_client_write_a_text_in_the_inputbox("hola");

      the_client_active_the_cleaner();

      the_resultbox_show_the_text_cleaned("hola");
      
    });

    function the_client_write_a_text_in_the_inputbox(text) {
      expect(inputBox.length).toEqual(1);
      inputBox.html(text);
    }

    function the_client_active_the_cleaner() {
      expect(button.length).toEqual(1);
      button.click();
    }

    function the_resultbox_show_the_text_cleaned(text) {
      expect(resultBox.length).toEqual(1);
      expect(resultBox.html()).toBe(text);
    }
  });
});


/*

name@"gmail".com
+
TO Do:
'
  - ""
    =>""

  - "Peter"
    =>"Peter"


- "Hi my email is lalala(AT)gmail.com"
      => " - Hi my email is lalala@gmail.com"

- "Hi my email is lalala(AT)gmail(DOT)com"
      => " - Hi my email is lalala@gmail.com"


- "Hi my email is lalala@gmail-DOT-com"
      => " - Hi my email is lalala@gmail.com"


- "Hi my email is lalala-AT-gmail.com"
      => " - Hi my email is lalala@gmail.com"o
*/