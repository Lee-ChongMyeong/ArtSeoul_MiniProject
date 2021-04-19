commentRouter.get('/:boardId', async (req, res, next) => {
    const boardId = req.params.boardId;
    let result = { status: 'success', comments: [] };
    try {
        let comments = await CommentBoard.find({ boardId: boardId }).sort({ date: -1 });

        //
        for (comment of comments) {
            console.log(comment)
            const profileData = await User.findOne({ id: comment["userId"] })
            console.log(profileData)
            let temp = {
                commentId: comment.commentId,
                commentContents: comment.commentContents,
                nickname: comment.nickname,
                boardId: boardId,
                userId: comment.userId

            };
            result['comments'].push(temp);
        }
    } catch (err) {
        result['status'] = 'fail';
    }
    res.json(result);
});

////


commentRouter.get('/:boardId', async (req, res, next) => {
    const boardId = req.params.boardId;
    let result = { status: 'success', comments: [] };
    try {
        let comments = await CommentBoard.find({ boardId: boardId }).sort({ date: -1 });

        //
        for (comment of comments) {
            console.log(comment)
            let temp = {
                commentId: comment.commentId,
                commentContents: comment.commentContents,
                nickname: comment.nickname,
                boardId: boardId,
                userId: comment.userId

            };
            result['comments'].push(temp);
        }
    } catch (err) {
        result['status'] = 'fail';
    }
    res.json(result);
});