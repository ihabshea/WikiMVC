const { buildSchema } = require('graphql');
module.exports =
buildSchema(`
  type article{
    _id: ID!
    titles: [title!]
    descriptions: [description!]
    createdOn: String!
    modifiedOn: String!
    creator: person!
    category: category
    sections: [section!]
    title: title
    languages:  [supportedLanguages!]!
    fields: [field!]
    modifiers: [person!]
    modifications: [modification!]
  }
  type person{
    _id: ID!
    name: String!
    registrationDate: String!
    email: String!
    username: String!
    articles: [article!]
    modifications: [modification!]
  }
  type modification{
    _id: ID!
    user: person!
    article: article
    section: section
    field: field
    fieldPName: String
    fieldCName: String
    fieldPValue: String
    fieldCValue: String
    explanation: String
    delete: Boolean
    create: Boolean
    createType: String
    deleteType: String
    sectionPText: String
    sectionNText: String
    otitle: String
    opicture: Picture
    npicture: Picture
    ntitle: String
    odescription: String
    ndescription: String
    language: supportedLanguages!
    date: String!
  }
  type section {
    _id: ID!
    author: person!
    language: supportedLanguages!
    title: String
    content: String
    createdOn: String!
    lastModification: String!
    modifiers: [person!]
    modifications: [modification!]
  }
  type Object {
    _id: ID!
    field: field!
    type: String!
    refArticle: article
    value: String!
  }
  type category {
    _id: ID!
    author: person!
    type: String!
    titles: title
    shorthand: String!
    descriptions: description
    languages: [supportedLanguages!]
  }
  type field {
    _id: ID!
    author: person!
    article: article!
    language: supportedLanguages!
    birth: Boolean
    death: Boolean
    name: String
    type: String
    order: Int! 
    lastModification: String!
    modifications: [modification!]
    value: String
    special: Boolean
    articleRef: article
    list: Boolean
    objects: [Object!]
    relatedDates: [String]
    articlesRef: [article]
  }
  type title{
    _id: ID!
    article: article!
    text: String!
    createdOn: String!
    language: supportedLanguages!
  }
  type description{
    _id: ID!
    article: article!
    text: String!
    lastModification: String!
    modifications: [modification!]
    language: supportedLanguages!
  }
  type supportedLanguages{
    _id: ID!
    name: String!
    shorthand: String!
  }
  type Picture{
    _id: ID!
    url: String!
    uploader: person!
    uploaded: String!
    article: article
    category: category
    language: supportedLanguages!
  }
  type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input UserInput{
    username: String!
    password: String!
    email: String!
    name: String!
    registrationDate: String!
  }

  input TitleInput{
    title: String!
    articleId: ID!
    language: String!
  }
  input DescriptionInput{
    articleId : ID!
    text: String!
    language: String!
  }
  input SectionInput{
    language: String!
    articleId: ID!
  }
  input FieldInput{
    name: String!
    value: String!
    articleId: ID!
    language:  String!
    special: Boolean
    articleRef: ID
    articlesRef: [ID]
    type: String
    relatedDates: [String]
  }
  type RootMutation{
    registerUser(userInput: UserInput): person!
    createArticle(language: String!): article!
    createDescription(descriptionInput: DescriptionInput): description!
    updateDescription(descriptionInput: DescriptionInput): description!
    createTitle(titleInpt: TitleInput): title!
    createField(fieldInput: FieldInput): field!
    createSection(articleID: ID!, language: String!): section!
    updateSectionTitle(sectionID: ID!, title: String!): section!
    createBlankField(articleId: ID!, language: String!, name: String!, type: String!): field!
    createObject(fieldId: ID!, refArticle: ID, value: String!, type: String!): Object!
    updateSectionContent(sectionID: ID!, content: String!): section!
    updateField(fieldID: ID!, newvalue: String!): field!
    deleteSection(sectionID: ID!): modification!
    categorize(articleId: ID!, category: ID!): category!
    addLanguage(articleId: ID!, language:String!): supportedLanguages!
    deleteField(fieldID: ID!, reason: String!, language: String!): modification!
    createLanguage(name: String, shorthand: String): supportedLanguages!
    uploadPicture(url: String!, article: ID!, language: String!): Picture!
  }
  type RootQuery{
    articles(language: String!): [article!]
    people(language: String!): [article!]
    article(id: ID!, language: String!): article!
    articlesPhone: [article!]
    users: [person!]
    sections(articleID: ID!,language: String!): [section!]
    section(sectionId: ID!): section!
    fields(articleID: ID!,language: String!): [field!]
    field(articleID: ID!,language: String!): field!
    title(articleID: ID!, language: String!): title
    description(articleID: ID!, language: String!): description
    findArticlesByLanguage(language: String!): [article!]
    language(shorthand: String!): supportedLanguages!
    languages: [supportedLanguages!]
    Nlanguages(articleId: ID!): [supportedLanguages!]
    category(articleId: ID!): category
    categories(language: String!): [category!] 
    alanguages(aid: ID!):  [supportedLanguages!]
    modifications(articleID: ID!,language: String!): [modification!]
    login(username: String!, password: String!): AuthData!
    topArticles(limit: Int!): [article!]!
    picture(articleId: ID!, language: String!): Picture
  }
  schema{
    query: RootQuery,
    mutation: RootMutation
  }
  `);
