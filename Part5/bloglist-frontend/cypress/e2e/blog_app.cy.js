describe("Blog", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    const user2 = {
      name: "Alex",
      username: "Alex",
      password: "Alex",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("login form can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("Matti Luukkainen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai3232");
      cy.get("#password").type("salainen3232");
      cy.get("#login-button").click();

      cy.get(".notification")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("new note").click();
      cy.get("#title").type("testTitle");
      cy.get("#author").type("testAuthor");
      cy.get("#url").type("testUrl");
      cy.get("#create-blog").click();
      cy.get(".notification")
        .should("contain", "a new blog testTitle by testAuthor added")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
      cy.get("#listOfBlogs").should("contain", "testTitle");
      cy.get("#listOfBlogs").should("contain", "testAuthor");
    });

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createBlog({ title: "blog 1", author: "blog 1", url: "blog 1" });
        cy.createBlog({ title: "blog 2", author: "blog 2", url: "blog 2" });
        cy.createBlog({ title: "blog 3", author: "blog 3", url: "blog 3" });
      });

      it("one of those can be liked", function () {
        cy.contains("blog 1").parent().find("button").as("theButton");
        cy.get("@theButton").click();

        cy.contains("Like").click();

        cy.get(".notification")
          .should("contain", "blog blog 1 by blog 1 liked by Matti Luukkainen")
          .and("have.css", "color", "rgb(0, 128, 0)")
          .and("have.css", "border-style", "solid");
      });

      it("user can delete", function () {
        cy.contains("blog 1").parent().find("button").as("theButton");
        cy.get("@theButton").click();

        cy.contains("Remove").click();

        cy.get(".notification")
          .should("contain", "blog blog 1 by blog 1 removed")
          .and("have.css", "color", "rgb(0, 128, 0)")
          .and("have.css", "border-style", "solid");
      });

      it("user cant delete", function () {
        cy.contains("Logout").click();
        cy.login({ username: "Alex", password: "Alex" });
        cy.contains("blog 1").parent().find("button").as("theButton");
        cy.get("@theButton").click();

        cy.contains("Remove").click();

        cy.get(".notification")
          .should(
            "contain",
            "Something is wrong with your operation. Are you removing a blog you created?"
          )
          .and("have.css", "color", "rgb(255, 0, 0)")
          .and("have.css", "border-style", "solid");
      });
    });

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createBlog({ title: "blog 1", author: "blog 1", url: "blog 1", likes: 0 });
        cy.createBlog({ title: "blog 2", author: "blog 2", url: "blog 2", likes: 15 });
        cy.createBlog({ title: "blog 3", author: "blog 3", url: "blog 3", likes: 10 });
      });
      it("blogs are ordered by likes", function () {
        cy.get(".blog").eq(0).should("contain", "blog 2");
        cy.get(".blog").eq(1).should("contain", "blog 3");
        cy.get(".blog").eq(2).should("contain", "blog 1");
      });
    });
  });
});
