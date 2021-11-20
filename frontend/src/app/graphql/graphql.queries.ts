import { gql } from "apollo-angular";

const GET_ALL_SURVEYS = gql`
	query { 
        allSurveys {
            id
            surveyTitle
        }
    }
`;

const CREATE_NEW_USER_SESSION = gql`
    mutation CreateUser($surveyId: String!, $currentQuestionId: String!){ 
        createNewUser(input:{
            whichSurveyIsTaking: $surveyId,
            currentQuestionId: $currentQuestionId
        }) {
            sessionToken
        }
    }
`

const GET_QUESTION = gql`
    query GetQuestion($questionId: ID!) {
        singleQuestion(questionId: $questionId){
            id
            value
            answerChoice
            lastQuestion
            answers {
                id
                value
                parentQuestionId
                nextQuestionId
            }
        }
    }
`

const SUBMIT_USER_ANSWER = gql`
    mutation CreateUserAnswer($selected: Boolean!, $answerId: ID!, $questionId: ID!, $userSessionToken: String!) {
        createNewUserAnswer(input:{
            selected: $selected,
            answerId: $answerId,
            questionId: $questionId,
            userSessionToken:$userSessionToken,
        }) {
            nextQuestionId
            parentQuestionId
            id
            value
        }
    }
`

const GET_SCORE = gql`
    query GetDecision($userSessionToken: ID!) {
        getDecision(input:{userSessionToken:$userSessionToken}) {
            percent
            points
        }
    }
`

export { GET_ALL_SURVEYS, CREATE_NEW_USER_SESSION, GET_QUESTION, SUBMIT_USER_ANSWER, GET_SCORE }