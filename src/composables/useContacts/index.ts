import { address, contactsInstagram, contactsTelegram, delivery, googleMaps, star } from '@/assets/icons';

export function useContactsPage() {
  const socials = [
    // { type: 'phone', title: 'Позвонить', value: '+998 99–798–84–88', link: 'tel:+998997988488', icon: contactsPhone },
    { type: 'telegram', name: 'Telegram', link: 'https://t.me/oblacko_tashkent', icon: contactsTelegram },
    { type: 'instagram', name: 'Instagram', link: 'https://instagram.com/oblacko_tashkent', icon: contactsInstagram },
  ];
  /*
  const workingHours = {
    isOpenNow: true,
    days: [
      { name: 'Понедельник', time: '11:00 - 04:00', hours: '17 часов' },
      { name: 'Вторник', time: '11:00 - 04:00', hours: '17 часов' },
      { name: 'Среда', time: '11:00 - 04:00', hours: '17 часов' },
      { name: 'Четверг', time: '11:00 - 04:00', hours: '17 часов' },
      { name: 'Пятница', time: '11:00 - 04:00', hours: '17 часов' },
      { name: 'Суббота', time: '11:00 - 04:00', hours: '17 часов' },
      { name: 'Воскресенье', time: '11:00 - 04:00', hours: '17 часов' },
    ],
  }; */

  const mapLinks = [
    { name: '2GIS', link: 'https://2gis.uz/tashkent/firm/70000001040450175?m=69.27838%2C41.298384%2F18.08', icon: address },
    { name: 'Google Maps', link: 'https://maps.app.goo.gl/rwGJLGyvEjuLCS217', icon: googleMaps },
    { name: 'Яндекс Карты', link: 'https://yandex.uz/maps/org/63187332839/', icon: address },
  ];

  const services = [
    { name: 'Яндекс.Еда', icon: delivery, link: 'https://eats.yandex.com/uz/r/oblako_1681733515?placeSlug=oblako' },
    { name: 'TripAdvisor', link: 'https://www.tripadvisor.com/Restaurant_Review-g293968-d26670786-Reviews-Oblacko-Tashkent_Tashkent_Province.html', icon: star },
  ];

  const place = {
    address: 'г. Ташкент, Мирабадский район, ул. Фидокор, дом 10',
    shortAddress: 'ул. Фидокор, дом 10',
    city: 'Мирабадский район • Ташкент',
    primaryMapLink: '#',
  };

  return { socials, mapLinks, services, place };
}
