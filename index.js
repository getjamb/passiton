import request from 'request-promise'

class PassItOn {
  constuctor({ workable }) {
    this.workable = workable;
  }

  async addCandidateToWorkable({
    firstname,
    lastname,
    email,
    headline,
    summary,
    address,
    phone,
    cover_letter,
    educations,
    experiences,
    skills
  }, jobShortCode) {

    if(this.workable) {
      const { accessToken, subDomain } = this.workable;
      const data = {
        name: `${firstname} ${lastname}`,
        firstname,
        lastname,
        email,
        headline,
        summary,
        address,
        phone,
        cover_letter,
        education_entries: educations,
        experience_entries: experiences
      }

      const headers = {
      	'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }

      const uri = `https://${subDomain}.workable.com/spi/v3/jobs/${jobShortCode}/candidates`

      const options = {
        uri, method: 'POST', headers, body: data, json: true
      }

      const response = await request(options);
      const { candidate } = response;
      return candidate;

    } else {
      throw {
        message: 'You haven\'t provided workable credentials'
      }
    }
  }
}

export default PassItOn;
