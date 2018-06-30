// class Character {
//     constructor(attr){
//         this.hp  = attr.hp;
//         this.totalHP = attr.totalHP;
//         this.name = attr.name;
//         this.currentEquipment = attr.currentEquipment;
//         this.stats = attr.stats;
//     }
//     //METHODS
//     attack () {
        
//     }
// }

// class Character
//   Fields
//     hp: int
//     totalHP: int
//     name: string
//     currentEquipment: {
//       weapon: Weapon,
//       armor: {
//         head: ArmorPiece,
//         torso: ArmorPiece,
//         hands: ArmorPiece,
//         legs: ArmorPiece,
//         ring: Buff
//       }
//     }
//     stats: {
//       strength: int,
//       intelligence: int,
//       dexterity: int
//     }
//   Methods
//     attack() => { type: int, damage: int }
//       type = currentEquipment.weapon.damageType
//       damage = currentEquipment.weapon.getDamage(stats)

//     getLevel() => int
//       return Math.floor((strength + intelligence + dexterity) / 5)

//     takeDamage(attackObject) => int
//       totalDefense = objectAdd(
//         armor.head.getDefense(),
//         armor.torso.getDefense(),
//         armor.hands.getDefense(),
//         armor.legs.getDefense(),
//         armor.ring.getDefense()
//       )
//       if attack.type = physical
//         damageTaken = attackObject.damage - totalDefense[attackObject.type]
//       else
//         damageTaken = attackObject.damage * (1 - totalDefense[attackObject.type])
//       hp -= damageTaken
//       return damageTaken