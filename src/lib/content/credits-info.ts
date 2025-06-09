import type { ContentSentence } from '$lib/text-translator/types';

export type CreditPersion = {
	id: string;
	name: string;
	excerpt: ContentSentence;
	bio: ContentSentence;
	image?: string;
};

export const credits: CreditPersion[] = [
	{
		id: '1',
		name: 'Jonathan Cachia',
		excerpt: {
			en: 'Founder and SCI Survivor',
			mt: `Fondatur u 'SCI Survivor'`
		},
		bio: {
			en: "I am Jonathan Cachia, known to friends and family as Gianni. I am a determined individual, with a penchant for problem solving. Professionally, I have a proven track record of coaching individuals to achieve their full potential, and I am experienced in leading people in challenging and diverse situations within a customer service environment at the highest levels. An avid motorcyclist and hobbyist mechanic with a love for the outdoors, my life outside work was built around planning the next overland journey on my motorcycle with my wife or in my off-road prepped vehicle camping somewhere remote.\nOn the 10th May 2023, at 35 years of age, I suffered a motor vehicle accident rendering me a Quadriplegic. Following a 9-day stay in ITU, spinal vertebrae stabilizing surgery and 11 days of recovery, I was admitted to Karin Grech Rehabilitation Hospital for a year and 4 months of intensive Physical and Occupational Therapy, discharged on the 27th September 2024. I am now on the arduous journey of rebuilding my life with all its new challenges.\nPost injury I remain determined to make a difference. After having experienced first-hand the difficulties and frustrations a life of disability can throw at you, and all the pain and suffering there is around us, to which the world at large seems oblivious to, I have decided to make an impact where it matters most, to improve people's quality of life wherever, whenever and however possible to the best of my abilities.",
			mt: "Jien Jonathan Cachia, magħruf lill-ħbieb u lill-familja bħala Gianni. Jiena persuna determinata, b'rieda kbira li nsib soluzzjonijiet kreativi. Min naħa professjonali, għandi esperjenza kbira fil-'coaching' ta' individwi huma u jiksbu l-potenzjal sħiħ tagħhom, u jien esperjenzat fil-mexxija ta' nies f'sitwazzjonijiet sfida u diversi fl-ambjent tas-servizz tal-konsumatur fil-livelli l-ogħla. Jiena wkoll motociklist appassionat u mekkaniċist dilettant, b'imħabba għall-ambjent, u ħajjti barra x-xogħol kienet mibnija madwar il-pjanar tal-vjaġġi li jmiss fuq il-mutur tiegħi ma' marti jew vann tal-'off-road' tiegħi nikampjaw f'xi post remot.\nFil-10 ta' Mejju 2023, fl-età ta' 35 sena, sofrejti inċident tat-traffiku li ħallini 'Quadriplegic'. Wara perjodu ta' 9 ijiem fl-ITU, operazzjoni ta' stabilizzazzjoni tal-ispina u 11-il ġurnata ta' rkupru, ġejt imdaħħal fl-Isptar ta' Karin Grech għal sena u 4 xhur ta' terapija intensiva. Ħrieġt fit-27 ta' Settembru 2024. Issa qiegħed fuq it-triq twila biex nibni ħajti mill-ġdid bil-isfidi ġodda tagħha li iġġib magħha.\nWara l-'injury' tiegħi, jien determinat li nagħmel differenza. Wara li esperjenzajt l-isfidi u l-frustrazzjonijiet li tista' toffri ħajja b'diżabilità, u l-uġigħ u t-tbatija kollha li hemm madwarna, li d-dinja b'mod ġenerali tidher li ma tarahomx, ddeċidejt li nagħmel impatt fejn hu meħtieġ l-aktar, biex ittejjeb il-kwalità tal-ħajja tan-nies fejn, meta u kif inhu possibbli bl-aħjar mod li nista'."
		}
	},
	{
		id: '2',
		name: 'Maurovic Cachia',
		excerpt: {
			en: 'Co-Founder and Software Developer',
			mt: `Ko-Fondatur u 'Software Developer'`
		},
		bio: {
			en: "I am Maurovic Cachia, or Mauro for short. I am a software developer, and in general lover of all things tech. I love creating stuff, whether it be software, hardware or a combination of both. Apart from that, music is a big part of my life, and apart from listening to music every other minute, I writing and playing my guitar is my unstructured creative outlet.\nI am also a big believer in the power of technology to change the world for the better. I believe that technology can be used to solve some of the world's biggest problems, and I want to be a part of that change. After my brother suffer his life changing injury, I knew I wanted to expand and employ my skillset towards helping him, and people like him.\n So with him, I co-founded ReAbility.mt, a platform that aims to provide information, resources, and community for people who are going through life changing injuries. I am excited to be a part of this project and to help make a difference in the lives of others.",
			mt: "Jien Maurovic Cachia, jew Mauro fil-qasir. Jiena 'software developer', u ġeneralment persuna li jinterraħ kollox li għandu x'jaqsam mat-teknoloġija. Inħobb noħloq affarijiet, kemm jekk software, hardware jew ftit mit-tnejn. Apparti min hekk, il-mużika hija parti kbira mill-ħajja tiegħi, u barra milli nisma l-mużika bażikament il-ħin kollu, l-iktar mod li nħalli l-kreattività tiegħi toħroġ huwa billi nikteb u indoqq il-kitarra tiegħi.\nJiena wkoll nemmen bis-sħiħ fil-qawwa tat-teknoloġija biex tbiddel id-dinja għall-aħjar. Nemmen li t-teknoloġija tista' tintuża biex issolvi xi wħud mill-akbar problemi tad-dinja, u nixtieq li nkun parti minn dik il-bidla. Wara li ħija weġġa, kont naf li nixtieq nespandi u nuża l-ħiliet tiegħi biex ngħin lilu, u nies bħalu.\nAllura flimkien miegħu, iffurmajna ReAbility.mt, pjattaforma li għandha l-għan li tipprovdi informazzjoni, riżorsi u komunità għal nies li qed jgħaddu minn korrimenti li affettwa kull parti tal-ħajja tagħhom. Jiena eċċitat li nkun parti minn dan il-proġett, li nitama li ħa jagħmel differenza pożitiva fil-ħajjiet ta' oħrajn."
		}
	}
];
