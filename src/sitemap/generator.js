import { sitemapBuilder as buildSitemap, paramsApplier as applyParams } from 'react-router-sitemap'; // import applyParams for paths pattern
import routes from './routes';
import path from 'path'; // add path which will be needed for file write
import fs from 'fs'; // import file system object
import axios from "axios";

const hostname = 'https://flippohome.com/';
const dest = path.resolve('./public', 'sitemap.xml');

// !!! This function should return array from backend with all advert & all cities we have adverts in!!!!
// const posts = getPostsForSitemap();

axios
.get(`/seo/cities`)
.then(cities => {
  axios
    .get(`/seo/ids`)
    .then(ids => {
      const config = {
        '/search/city/:cityName': [
          { cityName: cities.data },
        ],
        '/advert/:id': [
          { id: ids.data },
        ],
      };
      const paths = applyParams(routes, config);
      const sitemap = buildSitemap(hostname, paths);
      fs.writeFileSync(dest, sitemap.toString());
    })
    .catch(err => console.log(err));
})
.catch(err => console.log(err));
