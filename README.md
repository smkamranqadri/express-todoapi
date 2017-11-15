# Express REST API Server

  Base Url: https://express-todoapi.herokuapp.com/

	### Todo without Auth

		Api: /api/v1/todo
    	Method: Get

		Api: /api/v1/todo/:id
    	Method: Get

		Api: /api/v1/todo
    	Method: Post
		Body: {
			text: string
		}
		
		Api: /api/v1/todo/:id
    	Method: Put
		Body: {
			text: string
		}

		Api: /api/v1/todo/:id
    	Method: Delete

### Todo with Auth

    Api: /api/v1/login
    	Method: Post
		Body: {
			email: string
			password: string
		}

		Api: /api/v1/register
    	Method: Post
		Body: {
			email: string
			password: string
		}

		Api: /api/v1/todo
    	Method: Get
		Token: {
			header: x-access-token
			query: token
		}

		Api: /api/v1/todo/:id
    	Method: Get
		Token: {
			header: x-access-token
			query: token
		}

		Api: /api/v1/todo
    	Method: Post
		Token: {
			header: x-access-token
			query: token
			body: token
		}
		Body: {
			text: string
		}
		
		Api: /api/v1/todo/:id
    	Method: Put
		Token: {
			header: x-access-token
			query: token
			body: token
		}
		Body: {
			text: string
		}

		Api: /api/v1/todo/:id
		Token: {
			header: x-access-token
			query: token
			body: token
		}
    	Method: Delete

### Users with Admin Auth

Api: /api/v1/login
    Method: Post
		Body: {
			email: string
			password: string
		}

		Api: /api/v1/user
    	Method: Get
		Token: {
			header: x-access-token
			query: token
		}

		Api: /api/v1/user/:id
    	Method: Get
		Token: {
			header: x-access-token
			query: token
		}

		Api: /api/v1/user
    	Method: Post
		Token: {
			header: x-access-token
			query: token
			body: token
		}
		Body: {
			name: string
			email: string
			password: string
		}
		
		Api: /api/v1/user/:id
    	Method: Put
		Token: {
			header: x-access-token
			query: token
			body: token
		}
		Body: {
			name: string
			email: string
			password: string
		}

		Api: /api/v1/user/:id
		Token: {
			header: x-access-token
			query: token
			body: token
		}
    	Method: Delete