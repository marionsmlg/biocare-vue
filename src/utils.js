import IconOilySkin from '@/components/icons/SkinTypes/IconOilySkin.vue'
import IconDrySkin from '@/components/icons/SkinTypes/IconDrySkin.vue'
import IconNormalSkin from '@/components/icons/SkinTypes/IconNormalSkin.vue'
import IconMixedSkin from '@/components/icons/SkinTypes/IconMixedSkin.vue'
import IconSmoothHair from '@/components/icons/HairTypes/IconSmoothHair.vue'
import IconFrizzyHair from '@/components/icons/HairTypes/IconFrizzyHair.vue'
import IconWavyHair from '@/components/icons/HairTypes/IconWavyHair.vue'
import IconCurlyHair from '@/components/icons/HairTypes/IconCurlyHair.vue'

import { markRaw } from 'vue'

export function addIcon(objectWithoutIcon) {
  const arrOfIcons = [
    {
      name: 'Sèche',
      icon: markRaw(IconDrySkin)
    },
    {
      name: 'Grasse',
      icon: markRaw(IconOilySkin)
    },
    {
      name: 'Mixte',
      icon: markRaw(IconMixedSkin)
    },
    {
      name: 'Normale',
      icon: markRaw(IconNormalSkin)
    },
    { name: 'Lisses', icon: markRaw(IconSmoothHair) },
    { name: 'Ondulés', icon: markRaw(IconWavyHair) },
    { name: 'Bouclés', icon: markRaw(IconCurlyHair) },
    { name: 'Frisées / Crépus', icon: markRaw(IconFrizzyHair) }
  ]

  if (Array.isArray(objectWithoutIcon)) {
    for (const objet of objectWithoutIcon) {
      const correspondingIcon = arrOfIcons.find((icon) => icon.name === objet.name)

      if (correspondingIcon) {
        objet.icon = correspondingIcon.icon
      }
    }
  } else {
    const correspondingIcon = arrOfIcons.find((icon) => icon.name === objectWithoutIcon.name)
    if (correspondingIcon) {
      objectWithoutIcon.icon = correspondingIcon.icon
    }
  }
}

export function capitalizeFirstLetter(str) {
  if (str.length === 0) {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
