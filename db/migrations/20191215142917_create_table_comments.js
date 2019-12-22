exports.up = function(knex) {
	return knex.schema.createTable("comments", commentsTable => {
		commentsTable.increments("comment_id");
		commentsTable
			.string("author")
			.references("users.username")
			.notNullable();
		commentsTable
			.integer("article_id")
			.references("articles.article_id")
			.notNullable();
		commentsTable.integer("votes").defaultTo(0);
		commentsTable
			.timestamp("created_at", { useTz: false })
			.defaultTo(knex.fn.now());
		commentsTable.string("body", 2000).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable("comments");
};
