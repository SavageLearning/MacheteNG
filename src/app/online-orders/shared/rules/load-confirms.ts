import { Confirm } from '../models/confirm';

export const loadConfirms = (): Array<Confirm> => {
  const result = [
    new Confirm({
      name: 'completion',
      description: `This order is not complete until I receive a confirmation email from Casa Latina.  
      If you do not hear from us or if you need a worker with 48 hours please call 206.956.0779 x3 
      during our business hours.`,
      confirmed: false
    }),
    new Confirm({
      name: 'arrival_time',
      description: ` Please allow a one hour window for workers to arrive.This will account for 
      transportation routes with multiple stops and for traffic. There is no transportation fee to 
      hire a Casa Latina worker when you pick them up from our office. To have your worker(s) arrive 
      at your door, there is a small fee payable through this form.`,
      confirmed: false
    }),
    new Confirm({
      name: 'employer_agency',
      description: `Casa Latina workers are not contractors. You will need to provide all tools, 
      materials, and safety equipment (link to http://casa-latina.org/information-for-employers) 
      necessary for the job(s) I wish to have done. `,
      confirmed: false
    }),
    new Confirm({
      name: 'screening',
      description: `I understand that as a condition of participation in our referral program, all 
      workers have been screened through the national and local sex offender registries.  However, 
      they have not gone through any other type of background checks.`,
      confirmed: false
    }),
    new Confirm({
      name: 'in-house_training',
      description: `Casa Latina does not employ the workers that it refers.  When I make the decision 
      to hire, I am their employer and they are my employees. All workers referred through Casa Latina 
      have completed at least 10 hours of in-house training and Casa Latina does its best to only 
      refer workers who are skilled and dependable, but it cannot and does not guarantee that worker 
      performance will always meet my expectations. Casa Latina is not responsible for any failure 
      in worker performance or for any damage or injuries that could conceivably occur during the 
      performance of the work I have hired these workers to perform.`,
      confirmed: false
    }),
    new Confirm({
      name: 'satisfaction',
      description: `If I am dissatisfied with work performance, I may ask that the worker stop 
      working and just pay them for the hours worked.  I am not obligated to continue to work with 
      her or him.`,
      confirmed: false
    }),
    new Confirm({
      name: 'covid-19',
      description: `I certify that no one in my household have symptoms of COVID-19, such as dry cough, 
      fever, and loss of smell and taste, or has been in close contact with someone who does, no one 
      in my household has tested positive for COVID-19, no one in my household been in close contact 
      with someone who has tested positive for COVID-19.
      `,
      confirmed: false
    })
  ];
  return result;
}
