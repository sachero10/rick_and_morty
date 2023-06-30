// const { describe } = require("node:test");
const app = require("../src/app");
const session = require("supertest");
const agent = session(app);
// const { email, password } = require("../src/utils/users");
const user = require("../src/utils/users");
const { myFavorites } = require("../src/controllers/handleFavorites");

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await agent.get("/rickandmorty/character/1");
      expect(response.body).toHaveProperty(
        "id",
        "name",
        "species",
        "gender",
        "status",
        "origin",
        "image"
      );
    });

    it("Si hay un error responde con status: 404", async () => {
      const response = await agent.get("/rickandmorty/character/999");
      expect(response.statusCode).toEqual(404);
    });
  });

  describe("GET /rickandmorty/login", () => {
    it("Debe responder True si se le pasa información de login correcta", async () => {
      const response = await agent.get(
        `/rickandmorty/login/?email=${user[0].email}&password=${user[0].password}`
      );
      // expect(response.body).toHaveProperty("access", true);  *tambien funciona*
      expect(response.body.access).toBe(true);
    });

    it("Debe responder False si se le pasa información de login correcta", async () => {
      const response = await agent.get(
        `/rickandmorty/login/?email=aaasfas&password=asdfadf`
      );
      // expect(response.body).toHaveProperty("access", false);  *tambien funciona*
      expect(response.body.access).toBe(false);
    });
  });

  describe("POST /rickandmorty/fav", () => {
    const character1 = { id: 1, name: "Alan" };
    const character2 = { id: 2, name: "Bastian" };

    it("Debe devolver el elemento enviado por Body", async () => {
      const response = await agent.post("/rickandmorty/fav").send(character1);
      expect(response.body).toContainEqual(character1);
    });

    it("Debe devolver los elementos previos y el actual", async () => {
      const response = await agent.post("/rickandmorty/fav").send(character2);
      expect(response.body).toContainEqual(character1);
      expect(response.body).toContainEqual(character2);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    const character1 = { id: 1, name: "Alan" };
    const character2 = { id: 2, name: "Bastian" };

    it("Debe devolver un arreglo cuando no hay personaje con ese ID", async () => {
      const response = await agent.delete("/rickandmorty/fav/32");
      expect(response.body).toContainEqual(character1);
      expect(response.body).toContainEqual(character2);
    });

    it("Debe devolver todo el arreglo sin el personaje eliminado", async () => {
      const response = await agent.delete("/rickandmorty/fav/1");
      expect(response.statusCode).toEqual(200);
      expect(response.body).not.toContainEqual(character1);
    });
  });
});
