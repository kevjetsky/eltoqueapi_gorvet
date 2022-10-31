import cheerio from 'cheerio';
import rp from 'request-promise';
import { pushArraysToData } from '../../libs/pushArrayData.js';

export default {
    getValue: async (req, res) => {
        let currency=[];
        let price = [];

        const options = {
            uri: 'https://eltoque.com',
            transform: (body) => {
                return cheerio.load(body);
            }
        };

        await rp(options)
            .then((body) => {
                const $ = body;
                    
                $('span.currency' , 'table.hmQVUs').each(function() {
                    var moneda = $(this).text();
                    moneda = (moneda.replace('1 ', ''));
                    currency.push(moneda);
                }); // saco los span q tienen el texto de la moneda y lo limpio
    
                $('span.price-text' , 'table.hmQVUs').each(function() {
                    var precio = $(this).text();
                    precio = (precio.replace(' CUP', ''));
                    price.push(precio);
                }); // saco los span q tienen el texto del valor respecto al cup  y lo limpio

                return pushArraysToData(currency, price); // armo mi array de salida
            }
        )
            .then(data => res.status(200).json(data));
    }
}