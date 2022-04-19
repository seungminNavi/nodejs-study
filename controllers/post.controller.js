const Validator = require("fastest-validator");
const models = require('../models');

// 데이터 삽입
function save(req, res) {
	// 삽입 데이터 객체
	const post = {
		title: req.body.title,
		content: req.body.content,
		imageUrl: req.body.imageUrl,
		categoryId: req.body.category_id,
		userId: 1
	}

	// 유효성 검사
	const schema = {
		title: {type:"string", optional: false, max: "100"},
		content: {type: "string", optional: false, max: "500"},
		categoryId: {type: "number", optional: false}
	}

	const v = new Validator();
	const validationResponse = v.validate(post, schema);

	if (!validationResponse) {
		return res.status(400).json({
			message: "Validation failed",
			errors: validationResponse
		})
	}

	models.Category.findByPk(req.body.category_id).then(result => {
		if (result !== null) {
			models.Post.create(post).then(result => {
				res.status(201).json({
					message: "Post create successfully",
					post: result
				})
			}).catch(error => {
				res.status(500).json({
					message: "Something went wrong",
					error: error
				})
			});
		} else {
			res.status(400).json({
				message: "Invalid Category ID",
				error: error
			})
		}
	});

	models.Post.create(post).then(result => {
		res.status(201).json({
			message: "Post create successfully",
			post: result
		})
	}).catch(error => {
		res.status(500).json({
			message: "Something went wrong",
			error: error
		})
	});
}

// path 와 일치한 데이터 출력 posts/:id
function show(req, res) {
	const id = req.params.id;

	models.Post.findByPk(id).then(result => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(404).json({
				message: "Post not found!`"
			})
		}
		res.status(200).json(result);
	}).catch(error => {
		res.status(500).json({
			message: "Something went wrong!"
		})
	})
}

// 모든 데이터 출력
function index (req, res) {
	models.Post.findAll().then(result => {
		res.status(200).json(result);
	}).catch(error => {
		res.status(500).json({
			message: "Something went wrong!",
			error: error
		})
	});
}

// 데이터 수정
function update(req, res) {
	const id = req.params.id;

	const updatedPost = {
		title: req.body.title,
		content: req.body.content,
		imageUrl: req.body.imageUrl,
		categoryId: req.body.category_id
	}
	
	const userId = 1;

	// 유효성 검사
	const schema = {
		title: {type:"string", optional: false, max: "100"},
		content: {type: "string", optional: false, max: "500"},
		categoryId: {type: "number", optional: false}
	}

	const v = new Validator();
	const validationResponse = v.validate(updatedPost, schema);

	if (!validationResponse) {
		return res.status(400).json({
			message: "Validation failed",
			errors: validationResponse
		})
	}

	models.Post.update(updatedPost, {where: {id: id, userId: userId}})
	.then(result => {
		res.status(200).json({
			message: "Post updated successfully",
			post: updatedPost
		})
	}).catch(error => {
		res.status(500).json({
			message: "Something went wrong!",
			error: error
		})

	})
}

// 데이터 삭제
function destroy(req, res) {
	const id = req.params.id;
	const userId = 1;

	models.Post.destroy({where:{id: id, userId: userId}}).then(result => {
		res.status(200).json({
			message: "Post delete successfully"
		})
	}).catch(error => {
		res.status(500).json({
			message: "Something went wrong!",
			error: error
		})

	})
}

// export
module.exports = {
	save: save,
	show: show,
	index: index,
	update: update,
	destroy: destroy
}