require('dotenv').config();
const { createClient } = require('@sanity/client');

console.log('\n🔍 Test de connexion Sanity\n');
console.log('Project ID:', process.env.SANITY_PROJECT_ID);
console.log('Dataset:', process.env.SANITY_DATASET);
console.log('Token présent ?', process.env.SANITY_API_TOKEN ? '✅ Oui' : '❌ Non');
console.log('Token longueur:', process.env.SANITY_API_TOKEN ? process.env.SANITY_API_TOKEN.length : 0);
console.log('Token commence par:', process.env.SANITY_API_TOKEN ? process.env.SANITY_API_TOKEN.substring(0, 10) + '...' : 'N/A');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2025-02-19',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function testConnection() {
  try {
    console.log('\n📡 Test de création d\'un document...\n');
    
    const testContact = {
      _type: 'contact',
      name: 'Test Backend',
      email: 'test@example.com',
      message: 'Ceci est un test de connexion',
      createdAt: new Date().toISOString(),
    };

    const result = await client.create(testContact);
    
    console.log('✅ SUCCÈS ! Document créé:', result._id);
    console.log('✅ Votre configuration est correcte !\n');
    
    // Nettoyer le document de test
    await client.delete(result._id);
    console.log('🧹 Document de test supprimé\n');
    
  } catch (error) {
    console.error('❌ ERREUR:', error.message);
    console.error('\n📋 Détails de l\'erreur:');
    console.error('Status Code:', error.statusCode);
    console.error('Details:', error.details);
    
    if (error.statusCode === 401) {
      console.error('\n⚠️  PROBLÈME: Token invalide ou manquant');
      console.error('Solution: Créez un nouveau token avec les permissions Editor');
    } else if (error.statusCode === 403) {
      console.error('\n⚠️  PROBLÈME: Permissions insuffisantes');
      console.error('Solution: Le token doit avoir les permissions Editor, pas Viewer');
    }
    console.error('\n');
  }
}

testConnection();