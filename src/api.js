import Axios from 'axios'

export default
{
  getData: async function()
  {
    return await Axios.get("/bdd.json");
  },

  getUser: async function(nom)
  {
    var reponse = await this.getData();
    var returnUser = {};
    reponse.data.utilisateurs.forEach(function(utilisateur)
    {
      if(utilisateur.nom == nom)
      {
        returnUser = utilisateur;
        return;
      }
    });
    return returnUser;
  },

  verifierAuthentification: async function(nom, mdp)
  {
    var utilisateur = await this.getUser(nom);
    if(utilisateur.nom == nom && utilisateur.mdp == mdp)
    {
      return true;
    }
    return false;
  }
}
