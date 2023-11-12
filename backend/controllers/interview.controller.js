const User = require("../models/User.model");
const Interview = require("../models/Interview.model");
const { OpenAI } = require("openai");
const apiKey = process.env.API_KEY;
// console.log(apiKey);
const openai = new OpenAI({ apiKey: apiKey });
const startingPrompts = {
  MERN: `You will serve as an interviewer and I will be the interviewee candidate. You have to assess the interviewee's coding, conceptual skills related to the JD provided. Your task is to prepare a series of questions related to the job requirements and skills listed by the interviewee. Please ask each question one-by-one and wait for the interviewee to answer before providing feedback and grading the answer. After the interview, create a comprehensive report identifying areas of improvement, strengths, and an overall grade from 0 to 10.

  Please ensure that each question pertains to the job's requirements and the interviewee's skills and expertise. Please provide constructive feedback and grade each question based on:
    - Subject Matter Expertise 
    - Communication Skills
  
  Please refer to the job description (JD) and the candidate's provided skills and expertise when developing your questions.
  
  JD: Angular Frontend Developer (Junior)
  
  Skills: Angular, Typescript, Javascript
  
  Just ask one question at a time and wait for me to give the answer. Do not give all the questions at once.  Ask the questions one by one.`,
  Java: "",
  DSA: "",
};
const endingPrompt = "";

exports.startInterview = async (req, res, next) => {
  let { type } = req.body;
  //get first question from chatgpt
  try {
    const conversation = [{ role: "user", content: startingPrompts[type] }]; //Long prompt about the interview
    // console.log(conversation);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });
    console.log(response.choices);
    const question = response.choices[0].message.content;//first quesiton from chatgpt
    //create new interview object ( id )
    const newInterview = new Interview({
      userId: req.userId,
      interviewType: type,
      conversation: [...conversation, { role: "assistant", content: question }],
      feedback: null,
    });
    await newInterview.save();
    res
      .status(200)
      .json({
        messsage: "Interview started successfully",
        newInterview,
        latest: question,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  // interviewid:new id of the started interview, 1st question from chatgpt,
};

exports.updateInterview = (req, res, next) => {
  // { conversation } = req.body;//answer added;
  // { id } = req.params
  //make requestion api recieve a response
  // add to conversation newconvo=[...conversation,{ role:"assistant",content: response.data}];
  //update the Interview FinByIdandUpdate(id, conversatoin:newConversation,{ new:true})
  //send the updated inteview object as response
};

exports.endInterview = (req, res, next) => {
 // { id} = req.params
 //conversation = req.body
  //upload vod
  // send chat gpt the ending prompt with the entier conversation,=> feedback object
  //extract teh object from api's response
  // const obj= JSON.parse(response.choices[0].message.content);
  // cont newFeedback= new Feedback(obj);
  // await newFeedback.save();
  //creat new feedback object  // put the newly created feedback id to interviews' feedback
  //   await Interview.findByIdAndUpdate({id}, { feedback: newFeedback._id});
  //  const user= await User.findOne(req.userId);
  //   await User.findByIdAndUpdate({req.userId}, { pastInterviews: [...user.pastInterviews, id]});
  //send a response as a harcoded msg like "THankyou for taking this interview";
};


exports.getInterview = (req, res, next) => {
  // const { interviewId } = req.params; // Assuming interviewId is passed in the request parameters

  // // Retrieve interview details...
  // Interview.findById(interviewId)
  //   .populate("feedback") // If you need to retrieve associated feedback
  //   .exec((err, interview) => {
  //     if (err || !interview) {
  //       // Handle error...
  //       return res.status(404).json({ message: "Interview not found" });
  //     }
  //     // Return interview details
  //     return res.status(200).json({ interview });
  //   });
};
