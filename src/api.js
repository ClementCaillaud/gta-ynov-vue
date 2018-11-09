import Axios from 'axios'

export default
{
  /**
   * Charger le fichier bdd.json dans son intégralité
   * @return {json} Le contenu de la BDD
   */
  getData: async function()
  {
    return await Axios.get("bdd.json");
  },
  /**
   * Récupérer les informations d'un utilisateur, dont le mot de passe
   * @param  {String} login Le login de l'utilisateur
   * @return {Object} L'utilisateur
   */
  getUserUnsafe: async function(login)
  {
    var reponse = await this.getData();
    var returnUser = {};
    reponse.data.utilisateurs.forEach(function(utilisateur)
    {
      if(utilisateur.login == login)
      {
        returnUser = utilisateur;
        return;
      }
    });
    return returnUser;
  },
  /**
   * Récupérer les informations d'un utilisateur, sans le mot de passe
   * @param  {String} login Le login de l'utilisateur
   * @return {Object} L'utilisateur
   */
  getUser: async function(login)
  {
    var reponse = await this.getData();
    var returnUser = {};
    reponse.data.utilisateurs.forEach(function(utilisateur)
    {
      if(utilisateur.login == login)
      {
        returnUser = utilisateur;
        returnUser.mdp = "";
        return;
      }
    });
    return returnUser;
  },
  /**
   * Vérifier l'authentification
   * @param  {String} login Le login de l'utilisateur
   * @param  {String} mdp Le mot de passe
   * @return {boolean} TRUE si l'association est bonne, FALSE sinon
   */
  verifierAuthentification: async function(login, mdp)
  {
    var utilisateur = await this.getUserUnsafe(login);
    if(utilisateur.login == login && utilisateur.mdp == mdp)
    {
      return true;
    }
    return false;
  }
}
