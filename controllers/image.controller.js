function upload(req, res) {
	if (req.file.filename) {
		res.status(201).json({
			message: "Image upload successfully",
			url: req.file.filename
		});
	} else {
		res.status(500).son({
			message: "Something went wrong!"
		})
	}
}

module.exports = {
	upload: upload
}