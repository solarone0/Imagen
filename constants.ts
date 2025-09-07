import type { Preset } from './types';

export const GENDER_PRESETS: Preset[] = [
  { label: '기본', value: '' },
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
  { label: '논바이너리', value: 'non-binary person' },
];

export const NATIONALITY_PRESETS: Preset[] = [
  { label: '기본', value: '' },
  { label: '한국인', value: 'Korean' },
  { label: '미국인', value: 'American' },
  { label: '일본인', value: 'Japanese' },
  { label: '중국인', value: 'Chinese' },
  { label: '유럽인', value: 'European' },
];

export const POSE_PRESETS: Preset[] = [
  { label: 'Standing', value: 'in a confident standing pose' },
  { label: 'Sitting', value: 'sitting casually on a chair' },
  { label: 'Action', value: 'in a dynamic action pose, ready for battle' },
  { label: 'Thinking', value: 'in a thoughtful pose, with a hand on their chin' },
  { label: 'Leaning', value: 'leaning casually against a wall' },
  { label: 'Walking', value: 'walking towards the camera with a slight smile' },
];

export const HAIR_STYLE_PRESETS: Preset[] = [
  { label: '기본', value: '' },
  { label: '긴 생머리', value: 'with long, flowing hair' },
  { label: '짧은 스파이크', value: 'with short, spiky hair' },
  { label: '땋은 머리', value: 'with intricate braids' },
  { label: '포니테일', value: 'with a high ponytail' },
  { label: '모호크', value: 'with a colorful mohawk' },
  { label: '아프로', value: 'with a big, curly afro' },
  { label: '슬릭백', value: 'with slicked back hair' },
  { label: '번 헤어', value: 'with a messy bun' },
  { label: '무지개 색', value: 'with vibrant, rainbow-colored hair' },
  { label: '드레드락', value: 'with long dreadlocks' },
];

export const TOP_PRESETS: Preset[] = [
  { label: '기본', value: '' },
  { label: '가죽 재킷', value: 'wearing a cool leather jacket' },
  { label: '후드티', value: 'wearing a comfortable hoodie' },
  { label: '그래픽 티셔츠', value: 'wearing a graphic t-shirt' },
  { label: '실크 블라우스', value: 'wearing an elegant silk blouse' },
  { label: '탱크탑', value: 'wearing a simple tank top' },
  { label: '니트 스웨터', value: 'wearing a cozy knit sweater' },
  { label: '버튼업 셔츠', value: 'wearing a formal button-up shirt' },
  { label: '중세 갑옷', value: 'wearing shiny medieval armor' },
  { label: 'SF 조끼', value: 'wearing a futuristic sci-fi vest' },
  { label: '턱시도 재킷', value: 'wearing a classy tuxedo jacket' },
];

export const BOTTOM_PRESETS: Preset[] = [
  { label: '기본', value: '' },
  { label: '찢어진 청바지', value: 'wearing ripped denim jeans' },
  { label: '카고 반바지', value: 'wearing cargo shorts' },
  { label: '플리츠 스커트', value: 'wearing a pleated skirt' },
  { label: '패턴 레깅스', value: 'wearing patterned leggings' },
  { label: '정장 바지', value: 'wearing tailored trousers' },
  { label: '트레이닝 바지', value: 'wearing loose sweatpants' },
  { label: '사이버펑크 바지', value: 'wearing cyberpunk-style pants with neon details' },
  { label: '기사 각반', value: 'wearing medieval leg armor' },
  { label: '스카치 킬트', value: 'wearing a traditional Scottish kilt' },
  { label: '나팔바지', value: 'wearing 70s style bell-bottoms' },
];

export const SHOE_PRESETS: Preset[] = [
  { label: '기본', value: '' },
  { label: '하이탑 스니커즈', value: 'wearing high-top sneakers' },
  { label: '컴뱃 부츠', value: 'wearing heavy-duty combat boots' },
  { label: '하이힐', value: 'wearing sparkling high heels' },
  { label: '가죽 샌들', value: 'wearing leather sandals' },
  { label: '로퍼', value: 'wearing classic loafers' },
  { label: '카우보이 부츠', value: 'wearing cowboy boots with spurs' },
  { label: '우주 부츠', value: 'wearing futuristic space boots' },
  { label: '플립플랍', value: 'wearing casual flip-flops' },
  { label: '플랫폼 슈즈', value: 'wearing chunky platform shoes' },
  { label: '운동화', value: 'wearing athletic running shoes' },
];

export const BACKGROUND_PRESETS: Preset[] = [
  { label: '기본', value: '' },
  { label: '해변', value: 'on a sunny beach with waves in the background' },
  { label: '지하철', value: 'inside a modern subway car' },
  { label: '도시 야경', value: 'on a rooftop overlooking a neon-lit city at night' },
  { label: '숲', value: 'in a dense, magical forest with sunbeams filtering through' },
  { label: '카페', value: 'in a cozy, stylish coffee shop' },
  { label: '사이버펑크 도시', value: 'in a futuristic, rain-slicked cyberpunk city street' },
  { label: '판타지 성', value: 'in front of a grand, medieval fantasy castle' },
  { label: '우주선 내부', value: 'inside the bridge of a sleek spaceship' },
  { label: '미니멀리스트 스튜디오', value: 'in a clean, minimalist white studio' },
];

export const VIEW_PRESETS: Preset[] = [
  { label: 'Selfie', value: 'a selfie' },
  { label: 'Front View', value: 'front view' },
  { label: 'Back View', value: 'view from the back' },
  { label: 'Side Profile', value: 'side profile' },
  { label: 'Full Body', value: 'full body shot' },
  { label: 'Close-up', value: 'close-up shot of the face' },
  { label: 'Low Angle', value: 'from a low angle' },
  { label: 'High Angle', value: 'from a high angle' },
  { label: 'Point of View', value: 'point of view (POV)' },
  { label: 'Action Shot', value: 'dynamic action shot' },
];

export const ASPECT_RATIO_PRESETS: Preset[] = [
  { label: '정사각형', value: '1:1' },
  { label: '가로', value: '16:9' },
  { label: '세로', value: '9:16' },
  { label: '4:3', value: '4:3' },
  { label: '3:4', value: '3:4' },
];