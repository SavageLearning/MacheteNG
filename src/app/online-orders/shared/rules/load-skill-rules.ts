/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { SkillRule } from '../models/skill-rule';

export function loadSkillRules(): Array<SkillRule> {
  return [
    new SkillRule({
      id: 1,
      wage: 20,
      minHour: 5,
      maxHour: 8,
      speciality: false,
      key: 'skill_general_labor',
      descriptionEn: 'General Labor',
      active: true
    }),
    new SkillRule({
      id: 2,
      subcategory: 'paint',
      level: 1,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      speciality: true,
      ltrCode: 'P',
      key: 'skill_painting_rollerbrush',
      active: true
    }),
    new SkillRule({
      id: 3,
      subcategory: 'drywall',
      level: 2,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      speciality: true,
      ltrCode: 'S',
      key: 'skill_drywall',
      descriptionEn: 'Sheetrock hanging',
      active: true
    }),
    new SkillRule({
      id: 4,
      subcategory: 'fence',
      level: 1,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      speciality: true,
      ltrCode: 'F',
      key: 'skill_landscaping_fence',
      descriptionEn: 'Build retaining wall / wood fence',
      active: true
    }),
    new SkillRule({
      id: 5,
      subcategory: 'carpentry',
      level: 1,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      speciality: true,
      ltrCode: 'C',
      key: 'skill_carpentry',
      descriptionEn: 'Carpentry, repairing fences, decks, etc.',
      active: true
    }),
    new SkillRule({
      id: 6,
      subcategory: 'build',
      level: 2,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      speciality: true,
      ltrCode: 'M',
      key: 'skill_masonry',
      descriptionEn: 'finishing and stone work',
      active: true
    }),
    new SkillRule({
      id: 7,
      wage: 23,
      minHour: 4,
      maxHour: 8,
      speciality: false,
      key: 'skill_deep_cleaning',
      descriptionEn: 'kitchen, bedrooms, living room, bathroom, etc.',
      minimumCost: 92,
      active: true
    }),
    new SkillRule({
      id: 8,
      wage: 20,
      minHour: 5,
      maxHour: 8,
      speciality: true,
      key: 'skill_moving',
      descriptionEn: 'Moving Furniture and Boxes',
      active: true
    }),
    new SkillRule({
      id: 9,
      subcategory: 'garden',
      level: 0,
      wage: 19,
      minHour: 5,
      maxHour: 8,
      fixedJob: false,
      speciality: false,
      ltrCode: 'Y',
      key: 'skill_yardwork',
      descriptionEn: 'only: yard cleaning, mowing, weeding and planting',
      descriptionEs: 'only: yard cleaning, mowing, weeding and planting',
      active: true
    }),
    new SkillRule({
      id: 10,
      wage: 20,
      minHour: 4,
      maxHour: 8,
      speciality: false,
      key: 'skill_basic_cleaning',
      active: true
    }),
    new SkillRule({
      id: 11,
      wage: 20,
      minHour: 5,
      maxHour: 8,
      fixedJob: false,
      speciality: false,
      key: 'skill_demolition',
      descriptionEn: 'walls, ceilings, floors, siding, fences, etc.',
      active: true
    }),
    new SkillRule({
      id: 12,
      subcategory: 'garden',
      level: 1,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      fixedJob: false,
      speciality: true,
      ltrCode: 'G',
      key: 'skill_adv_gardening',
      descriptionEn: 'includes pruning, trimming, transplanting, and basic yard work',
      active: true
    }),
    new SkillRule({
      id: 13,
      subcategory: 'garden',
      level: 2,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      fixedJob: false,
      speciality: true,
      ltrCode: 'L',
      key: 'skill_landscaping',
      descriptionEn: 'patio pavers, retaining walls and walkways',
      active: true
    }),
    new SkillRule({
      id: 14,
      subcategory: 'roof',
      level: 1,
      wage: 18,
      minHour: 5,
      maxHour: 8,
      fixedJob: false,
      speciality: true,
      ltrCode: 'R',
      key: 'skill_roofing',
      active: true
    }),
    new SkillRule({
      id: 15,
      level: 3,
      wage: 20,
      minHour: 5,
      maxHour: 8,
      fixedJob: false,
      speciality: true,
      key: 'skill_event_help',
      descriptionEn: 'Party and Events Staffing',
      active: true
    }),
    new SkillRule({
      id: 16,
      wage: 20,
      minHour: 5,
      maxHour: 8,
      speciality: false,
      key: 'skill_pressure_washing',
      descriptionEn: 'Pressure washing',
      active: true
    }),
    new SkillRule({
      id: 17,
      wage: 20,
      minHour: 5,
      maxHour: 8,
      speciality: false,
      key: 'skill_digging',
      descriptionEn: 'renches, drains, removing sod, etc',
      active: true
    }),
    new SkillRule({
      id: 18,
      wage: 20,
      minHour: 5,
      maxHour: 8,
      speciality: false,
      key: 'skill_hauling',
      descriptionEn: 'heavy material: lumber, dirt, rocks, bricks, bricks, mulch compost, heavy branches, etc.',
      active: true
    }),
    new SkillRule({
      id: 19,
      level: 1,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      speciality: true,
      ltrCode: 'I',
      key: 'skill_insulation',
      active: true
    }),
    new SkillRule({
      id: 20,
      subcategory: 'drywall',
      level: 1,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      speciality: false,
      ltrCode: 'S',
      key: 'skill_drywall',
      active: true
    }),
    new SkillRule({
      id: 21,
      wage: 22,
      minHour: 5,
      maxHour: 8,
      speciality: true,
      key: 'skill_flooring',
      active: true
    })

  ];
}

