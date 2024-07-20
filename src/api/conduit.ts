/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/articles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recent articles globally
         * @description Get most recent articles globally. Use query parameters to filter results. Auth is optional
         */
        get: operations["GetArticles"];
        put?: never;
        /**
         * Create an article
         * @description Create an article. Auth is required
         */
        post: operations["CreateArticle"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/articles/feed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get recent articles from users you follow
         * @description Get most recent articles from users you follow. Use query parameters to limit. Auth is required
         */
        get: operations["GetArticlesFeed"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/articles/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get an article
         * @description Get an article. Auth not required
         */
        get: operations["GetArticle"];
        /**
         * Update an article
         * @description Update an article. Auth is required
         */
        put: operations["UpdateArticle"];
        post?: never;
        /**
         * Delete an article
         * @description Delete an article. Auth is required
         */
        delete: operations["DeleteArticle"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/articles/{slug}/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get comments for an article
         * @description Get the comments for an article. Auth is optional
         */
        get: operations["GetArticleComments"];
        put?: never;
        /**
         * Create a comment for an article
         * @description Create a comment for an article. Auth is required
         */
        post: operations["CreateArticleComment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/articles/{slug}/comments/{commentId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete a comment for an article
         * @description Delete a comment for an article. Auth is required
         */
        delete: operations["DeleteArticleComment"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/articles/{slug}/favorite": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Favorite an article
         * @description Favorite an article. Auth is required
         */
        post: operations["CreateArticleFavorite"];
        /**
         * Unfavorite an article
         * @description Unfavorite an article. Auth is required
         */
        delete: operations["DeleteArticleFavorite"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/profiles/{username}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a profile
         * @description Get a profile of a user of the system. Auth is optional
         */
        get: operations["GetProfileByUsername"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/profiles/{username}/follow": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Follow a user
         * @description Follow a user by username
         */
        post: operations["FollowUserByUsername"];
        /**
         * Unfollow a user
         * @description Unfollow a user by username
         */
        delete: operations["UnfollowUserByUsername"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get tags
         * @description Get tags. Auth not required
         */
        get: operations["GetTags"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get current user
         * @description Gets the currently logged-in user
         */
        get: operations["GetCurrentUser"];
        /**
         * Update current user
         * @description Updated user information for current user
         */
        put: operations["UpdateCurrentUser"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Register a new user
         * @description Register a new user
         */
        post: operations["CreateUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Existing user login
         * @description Login for existing user
         */
        post: operations["Login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Article: {
            title: string;
            slug: string;
            description: string;
            body: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            tagList: string[];
            author: components["schemas"]["Profile"];
            favorited: boolean;
            /** Format: int32 */
            favoritesCount: number;
        };
        Comment: {
            /** Format: int32 */
            id: number;
            body: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            author: components["schemas"]["Profile"];
        };
        HttpValidationProblemDetails: {
            type?: string | null;
            title?: string | null;
            /** Format: int32 */
            status?: number | null;
            detail?: string | null;
            instance?: string | null;
            errors: {
                [key: string]: string[] | undefined;
            };
            [key: string]: unknown;
        };
        LoginUser: {
            email: string;
            password: string;
        };
        LoginUserRequest: {
            user: components["schemas"]["LoginUser"];
        };
        MultipleArticlesResponse: {
            articles: components["schemas"]["Article"][];
            /** Format: int32 */
            articlesCount: number;
        };
        MultipleCommentsResponse: {
            comments: components["schemas"]["Comment"][];
        };
        NewArticle: {
            title: string;
            description: string;
            body: string;
            tagList: string[];
        };
        NewArticleRequest: {
            article: components["schemas"]["NewArticle"];
        };
        NewComment: {
            body: string;
        };
        NewCommentRequest: {
            comment: components["schemas"]["NewComment"];
        };
        NewUser: {
            email: string;
            password: string;
            username: string;
        };
        NewUserRequest: {
            user: components["schemas"]["NewUser"];
        };
        Profile: {
            username: string;
            bio?: string | null;
            image?: string | null;
            following: boolean;
        };
        ProfileResponse: {
            profile: components["schemas"]["Profile"];
        };
        SingleArticleResponse: {
            article: components["schemas"]["Article"];
        };
        SingleCommentResponse: {
            comment: components["schemas"]["Comment"];
        };
        TagsResponse: {
            tags: string[];
        };
        UpdateArticle: {
            title?: string | null;
            description?: string | null;
            body?: string | null;
        };
        UpdateArticleRequest: {
            article: components["schemas"]["UpdateArticle"];
        };
        UpdateUser: {
            username?: string | null;
            email?: string | null;
            bio?: string | null;
            image?: string | null;
        };
        UpdateUserRequest: {
            user: components["schemas"]["UpdateUser"];
        };
        User: {
            email: string;
            username: string;
            bio?: string | null;
            image?: string | null;
            token: string;
        };
        UserResponse: {
            user: components["schemas"]["User"];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    GetArticles: {
        parameters: {
            query?: {
                /** @description Filter by author (username) */
                author?: string;
                /** @description Filter by favorites of a user (username) */
                favorited?: string;
                /** @description Filter by tag */
                tag?: string;
                /** @description Limit number of articles returned (default is 20) */
                limit?: number;
                /** @description Offset/skip number of articles (default is 0) */
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MultipleArticlesResponse"];
                };
            };
        };
    };
    CreateArticle: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Article to create */
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewArticleRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SingleArticleResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetArticlesFeed: {
        parameters: {
            query?: {
                /** @description Limit number of articles returned (default is 20) */
                limit?: number;
                /** @description Offset/skip number of articles (default is 0) */
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MultipleArticlesResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetArticle: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Slug of the article to get */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SingleArticleResponse"];
                };
            };
        };
    };
    UpdateArticle: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Slug of the article to update */
                slug: string;
            };
            cookie?: never;
        };
        /** @description Article to update */
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateArticleRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SingleArticleResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    DeleteArticle: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Slug of the article to delete */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetArticleComments: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Slug of the article that you want to get comments for */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MultipleCommentsResponse"];
                };
            };
        };
    };
    CreateArticleComment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Slug of the article that you want to create a comments for */
                slug: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewCommentRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SingleCommentResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    DeleteArticleComment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Slug of the article that you want to delete a comments for */
                slug: string;
                /** @description ID of the comment you want to delete */
                commentId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    CreateArticleFavorite: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Slug of the article that you want to favorite */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SingleArticleResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    DeleteArticleFavorite: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Slug of the article that you want to unfavorite */
                slug: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SingleArticleResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetProfileByUsername: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProfileResponse"];
                };
            };
        };
    };
    FollowUserByUsername: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Username of the profile you want to follow */
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProfileResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UnfollowUserByUsername: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Username of the profile you want to unfollow */
                username: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProfileResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    GetTags: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TagsResponse"];
                };
            };
        };
    };
    GetCurrentUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UpdateCurrentUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description User details to update. At least <strong>one</strong> field is required. */
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    CreateUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Details of the new user to register */
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewUserRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserResponse"];
                };
            };
        };
    };
    Login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Credentials to use */
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginUserRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["HttpValidationProblemDetails"];
                };
            };
        };
    };
}
