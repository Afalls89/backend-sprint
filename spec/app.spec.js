process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");
const knex = require("../db/connection");

const app = require("../app");

beforeEach(() => {
	return knex.seed.run();
});

after(() => {
	return knex.destroy();
});

describe("API Endpoints", () => {
	it("status: 404 returns object with message of Route not found", () => {
		return request(app)
			.get("/api/isNotAPath")
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).to.equal("Route not found");
			});
	});

	describe("/api", () => {
		describe("/topics", () => {
			describe("GET", () => {
				it("return status:200 with all topics ", () => {
					return request(app)
						.get("/api/topics")
						.expect(200)
						.then(({ body: { topics } }) => {
							expect(topics[0]).to.have.keys("slug", "description");
							expect(topics).to.be.an("array");
							expect(topics[0]).to.be.an("object");
						});
				});
			});

			describe("INVALID METHODS", () => {
				it("returns status: 405, with object containing message of  Method not allowed", () => {
					const invalidMethods = ["patch", "put", "delete", "post"];
					const promises = invalidMethods.map(method => {
						return request(app)
							[method]("/api/topics")
							.expect(405)
							.then(({ body: { msg } }) => {
								expect(msg).to.equal("Method not allowed");
							});
					});
					return Promise.all(promises);
				});
			});
		});

		// describe('/users/:username', () => {
		//     describe('GET', () => {
		//         it("return status:200 with an object containing info on the specified username ", () => {
		// 			return request(app)
		// 				.get("/api/users/:username")
		// 				.expect(200)
		// 				.then(({ body: { username } }) => {
		// 					expect(username).to.have.keys("", "description");
		// 					expect(topics).to.be.an("object");
		// 				});
		// 	    });
		//     })
		// })
	});
});