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
            answers {
                id
                value
                parentQuestionId
                nextQuestionId
            }
        }
    }
`

export { GET_ALL_SURVEYS, CREATE_NEW_USER_SESSION, GET_QUESTION }