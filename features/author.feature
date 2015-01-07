Feature: Author feature
  Create, read, update and delete information about authors

  Scenario Outline: Creating author
    Given The <name> and <birthdate> of an author
    When The API consumer sends a POST to /api/author
    Then The response should have the 201 status code
    Then The data of the author created should be the same as the data sent by arguments
    Then The response must contain the fields _id, created and books

  Examples:
    |  name   | birthdate |
    | Miguel de Cervantes Saavedra |    1547-09-29T00:00:00.000Z     |
    | Gabriel García Márquez |   1927-03-06T00:00:00.000Z     |
