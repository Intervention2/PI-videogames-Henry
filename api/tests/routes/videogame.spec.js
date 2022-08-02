/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Samuel quiero hace videogames",
  description: "Prueba Henry",
  release: "lel",
  rating: 5,
  platforms: ["Henry Station 5", "Hbox 360"],
  genre: ["Action", "Fighting"],
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true })
      .then(() =>
        Videogame.destroy({
          where: {
            name: videogame.name,
          },
        })
      )
      .then(() => Videogame.create(videogame))
  );

  describe("GET /videogames", () => {
    it("Devuelve los videojuegos", (done) =>
      agent
        .get("/videogames")
        .then(done())
        .catch(() => done(new Error("Caca")))).timeout(10000);

    it("Encuentra el videojuego", async () => {
      const foundVg = await Videogame.findOne({
        where: {
          name: videogame.name,
        },
      });
      agent.get(`/videogames/${foundVg.id}`).expect(200);
    }).timeout(10000);

    it("Encuentra el id", async () => {
      const foundVg = await Videogame.findOne({
        where: {
          name: videogame.name,
        },
      });
      agent.get(`/videogames?name=${foundVg.name}`).expect(200);
    }).timeout(10000);

    it("No lo encuentra si el id no existe", () => {
      agent.get(`/videogames/999999999999`).expect(404);
    });

    it("No lo encuentra si el nombre no existe", () => {
      agent.get(`/videogames&name=Lakronkhadetumadre`).expect(404);
    });
  });
});
