module.exports = {
 baseUrl: '/gta-ynov-vue/',
 pwa:
 {
   workboxPluginMode: 'GenerateSW',
   workboxOptions:
   {
     runtimeCaching:
     [
       {
         urlPattern: new RegExp(".*\/gta-ynov-vue\/.*"),
         handler: 'networkFirst'
       }
     ]
   }
 }
}
