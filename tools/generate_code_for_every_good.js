
// Table of goods with data required to generate code for them.
// Max reserve – upper limit for reserve factor, is lower for goods like meat which you can't store for a long time.
// Priority – how important the goods are, used for both players and AI. Groups of goods has min and max priority.
// Input add – if there's goods_input_*_add modifier type in vanilla or not, otherwise we'll need to create it.
// Input mult – if there's goods_input_*_mult modifier type in vanilla or not, otherwise we'll need to create it.
// Output add – if there's goods_output_*_mult modifier type in vanilla or not, otherwise we'll need to create it.

var goods = [
// Name                     Max reserve         Priority          Input add        Input mult       Output mult

// Group: Military, Priority 11 - 12

// Army
['small_arms',              1.00,               12,               1,               1,               1],
['artillery',               1.00,               12,               1,               1,               1],
['ammunition',              1.00,               12,               1,               1,               0],
['tanks',                   1.00,               11,               1,               1,               1],
['aeroplanes',              1.00,               11,               1,               0,               1],
['radios',                  1.00,               11,               1,               1,               0],

// Navy
['manowars',                1.00,               11,               1,               0,               1],
['ironclads',               1.00,               11,               1,               0,               1],

// Group: Industrial, Priority 5 - 10
// Subgroups: Important (9 - 10), Most (7 - 10), All (5 - 10)

// Industrial goods
['tools',                   1.00,               10,               1,               0,               1],
['engines',                 1.00,               10,               1,               0,               1],
['explosives',              1.00,               8,                1,               0,               0],
['automobiles',             1.00,               8,                1,               0,               1],
['telephones',              1.00,               8,                1,               0,               0],
['fertilizer',              1.00,               7,                1,               0,               0],
['paper',                   1.00,               7,                1,               0,               0],
['clippers',                1.00,               7,                1,               0,               1],
['steamers',                1.00,               7,                1,               0,               1],
['glass',                   1.00,               6,                1,               0,               0],

// Industrial materials
['oil',                     1.00,               10,               1,               1,               1],
['rubber',                  1.00,               10,               1,               0,               0],
['coal',                    1.00,               9,                1,               0,               0],
['steel',                   1.00,               9,                1,               0,               0],
['iron',                    1.00,               9,                1,               0,               0],
['lead',                    1.00,               8,                1,               0,               0],
['sulfur',                  1.00,               8,                1,               0,               0],
['dye',                     1.00,               7,                1,               0,               0],
['wood',                    1.00,               6,                1,               0,               0],
['hardwood',                1.00,               6,                1,               0,               1],
['silk',                    1.00,               6,                1,               0,               1],
['fabric',                  1.00,               5,                1,               0,               1],
['sugar',                   1.00,               5,                1,               0,               1],

// Group: Consumer, Priority 1 - 4
// Subgroups: Important (3 - 4), All (1 - 4)

// Staple consumer goods
['clothes',                 1.00,               4,                1,               0,               0],
['furniture',               1.00,               4,                0,               0,               0],
['grain',                   1.00,               4,                1,               0,               0],
['groceries',               1.00,               4,                1,               0,               0],
['fruit',                   0.25,               3,                1,               0,               1],
['fish',                    0.25,               3,                1,               0,               0],
['meat',                    0.25,               3,                1,               0,               0],

// Intoxicants
['liquor',                  1.00,               3,                1,               0,               1],
['tobacco',                 1.00,               3,                1,               0,               0],
['opium',                   1.00,               3,                1,               0,               0],

// Luxury goods
['wine',                    1.00,               2,                1,               0,               1],
['tea',                     1.00,               2,                0,               0,               0],
['coffee',                  1.00,               2,                0,               0,               0],
['fine_art',                1.00,               1,                0,               0,               0],
['porcelain',               1.00,               1,                0,               0,               0],
['luxury_clothes',          1.00,               1,                0,               0,               0],
['luxury_furniture',        1.00,               1,                0,               0,               0],
    
// ['services',                1.00,               12,               1,               1], // Can't stockpile logically
// ['transportation',          1.00,               12,               1,               1], // Can't stockpile logically
// ['electricity',             1.00,               12,               1,               1], // Can't stockpile logically
// ['gold',                    1.00,               12,               1,               1], // Is not used as a good
];

// Goods should be in alphabetical order in the code
goods.sort();

// Input production method will include modifiers for all goods
var ase_production_methods_saving = `
pm_ase_stockpile_saving_base = {
    texture = "gfx/interface/icons/production_method_icons/trade_center.dds"
    building_modifiers = {
        level_scaled = {
            building_employment_laborers_add = 10
        }
    }
}

pm_ase_stockpile_saving_input = {
    texture = "gfx/interface/icons/production_method_icons/trade_center.dds"
    building_modifiers = {
        workforce_scaled = {`;

// Output production method will include modifiers for all goods
var ase_production_methods_spending = `
pm_ase_stockpile_spending_base = {
    texture = "gfx/interface/icons/production_method_icons/trade_center.dds"
    building_modifiers = {
        level_scaled = {
            building_employment_laborers_add = 10
        }
        unscaled = {
            building_government_shares_add = 1
        }
    }
}

pm_ase_stockpile_spending_output = {
    texture = "gfx/interface/icons/production_method_icons/trade_center.dds"
    building_modifiers = {
        workforce_scaled = {`;

// Modifier types
var ase_modifier_types_input_add = '';
var ase_modifier_types_input_mult = '';
var ase_modifier_types_output_mult = '';

// Input and output modifiers, for each goods separately and for all goods at once
var ase_modifiers_input_mult_all_goods = `
ase_stockpile_input_mult_all_goods = {
    icon = gfx/interface/icons/timed_modifier_icons/modifier_gear_positive.dds`;
var ase_modifiers_input_mult = '';
var ase_modifiers_output_mult_all_goods = `
ase_stockpile_output_mult_all_goods = {
    icon = gfx/interface/icons/timed_modifier_icons/modifier_gear_positive.dds`;
var ase_modifiers_output_mult = '';

// Proxy for scripted effects, no need to generate effects, just execute the effect you want for all goods with this one
var ase_perform_effect_for_every_market_goods = `
ase_perform_effect_for_every_market_goods = {`;

// Scripted values
var ase_stockpile_goods_priority_values = '';
var ase_stockpile_goods_reserve_max_factor_values = '';
var ase_market_volume_values = '';
var ase_country_price_target_values = '';
var ase_market_reserve_values = '';
var ase_market_transfer_values = '';
var ase_country_reserve_values = '';
var ase_country_transfer_values = '';
var ase_state_reserve_values = '';
var ase_state_transfer_values = '';
var ase_scripted_trigger_values = '';
var ase_country_reserve_weeks_values = '';

// Scripted GUIs
var ase_generated_scripted_guis = '';

// Localization for generated stuff
var ase_generated_localization = `l_english:`;

for (var i = 0; i < goods.length; i++)
{
    // let goodName = goods[i][0].replace('_', ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());



    ase_production_methods_saving += `
            goods_input_` + goods[i][0] + `_add = 1`;
    ase_production_methods_spending += `
            goods_output_` + goods[i][0] + `_add = 1`;



if (goods[i][3] === 0)
{
ase_modifier_types_input_add += `
goods_input_` + goods[i][0] + `_add = {
    good = yes
    percent = no
}
`;
ase_generated_localization += `
 modifier_goods_input_` + goods[i][0] + `_add:0 "@` + goods[i][0] + `! $` + goods[i][0] + `$ input"
 modifier_goods_input_` + goods[i][0] + `_add_desc:0 "The amount of @` + goods[i][0] + `! $` + goods[i][0] + `$ consumed by buildings"`;
}



if (goods[i][4] === 0)
{
ase_modifier_types_input_mult += `
goods_input_` + goods[i][0] + `_mult = {
    good = no
    percent = yes
    num_decimals = 0
}
`;
ase_generated_localization += `
 modifier_goods_input_` + goods[i][0] + `_mult: "@` + goods[i][0] + `![Nbsp]$` + goods[i][0] + `$ input"
 modifier_goods_input_` + goods[i][0] + `_mult_desc: "The amount of @` + goods[i][0] + `![Nbsp]$` + goods[i][0] + `$ consumed by buildings"`;
}



if (goods[i][5] === 0)
{
ase_modifier_types_output_mult += `
goods_output_` + goods[i][0] + `_mult = {
    good = yes
    percent = yes
}
`;
ase_generated_localization += `
 modifier_goods_output_` + goods[i][0] + `_mult:0 "Building @` + goods[i][0] + `! $` + goods[i][0] + `$ output"
 modifier_goods_output_` + goods[i][0] + `_mult_desc:0 "A bonus or penalty to the amount of @` + goods[i][0] + `! output produced by buildings"`;
}


ase_modifiers_input_mult_all_goods += `
    goods_input_` + goods[i][0] + `_mult = -1`;
ase_modifiers_input_mult += `
ase_stockpile_input_mult_` + goods[i][0] + ` = {
    icon = gfx/interface/icons/timed_modifier_icons/modifier_gear_positive.dds
    goods_input_` + goods[i][0] + `_mult = 1
}
`;
ase_generated_localization += `
 ase_stockpile_input_mult_` + goods[i][0] + `:0 "$ASE_STOCKPILE_WORD$ $` + goods[i][0] + `$ $ASE_INPUT_WORD$"`;



ase_modifiers_output_mult_all_goods += `
    goods_output_` + goods[i][0] + `_mult = -1`;
ase_modifiers_output_mult += `
ase_stockpile_output_mult_` + goods[i][0] + ` = {
    icon = gfx/interface/icons/timed_modifier_icons/modifier_gear_positive.dds
    goods_output_` + goods[i][0] + `_mult = 1
}
`;
ase_generated_localization += `
 ase_stockpile_output_mult_` + goods[i][0] + `:0 "$ASE_STOCKPILE_WORD$ $` + goods[i][0] + `$ $ASE_OUTPUT_WORD$"`;



    ase_perform_effect_for_every_market_goods += `
    $effect$ = {
        goods = ` + goods[i][0] + `
    }`;



if (goods[i][0] === 'oil')
{
    ase_stockpile_goods_priority_values += `
ase_stockpile_goods_priority_` + goods[i][0] + ` = {
    value = ` + goods[i][2] + `
    if = {
        limit = {
            NOT = {
                has_technology_researched = pumpjacks
            }
        }
        subtract = 7
    }
}`;
}
else
{
    ase_stockpile_goods_priority_values += `
ase_stockpile_goods_priority_` + goods[i][0] + ` = ` + goods[i][2];
}

ase_stockpile_goods_reserve_max_factor_values += `
ase_stockpile_goods_reserve_max_factor_` + goods[i][0] + ` = ` + goods[i][1];



ase_market_volume_values += `
ase_stockpile_market_volume_records_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_market_volume_` + goods[i][0] + `
        }
        value = var:ase_stockpile_market_volume_` + goods[i][0] + `
        if = {
            limit = {
                var:ase_stockpile_market_volume_` + goods[i][0] + ` >= 0.10
            }
            modulo = {
                value = var:ase_stockpile_market_volume_` + goods[i][0] + `
                multiply = 10
                floor = yes
                divide = 10
            }
        }
        multiply = 100
        add = 1
    }
    else = {
        value = 0
    }
}

ase_stockpile_market_volume_average_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_market_volume_` + goods[i][0] + `
        }
        value = var:ase_stockpile_market_volume_` + goods[i][0] + `
        if = {
            limit = {
                has_local_variable = ase_stockpile_market_volume_records
            }
            divide = local_var:ase_stockpile_market_volume_records
        }
        else = {
            divide = ase_stockpile_market_volume_records_` + goods[i][0] + `
        }
        multiply = 10
        round = yes
        divide = 10
    }
    else = {
        value = market.mg:` + goods[i][0] + `.market_goods_sell_orders
        multiply = ase_stockpile_reserve_target_sell_factor
        add = {
            value = market.mg:` + goods[i][0] + `.market_goods_buy_orders
            multiply = ase_stockpile_reserve_target_buy_factor
        }
    }
}
`;



// AI values are hardcoded to save performance
let ase_stockpile_country_price_target_saving_ai_value = -0.10;
if (goods[i][2] <= 10)
{
    ase_stockpile_country_price_target_saving_ai_value -= 0.05;
}
if (goods[i][2] <= 8)
{
    ase_stockpile_country_price_target_saving_ai_value -= 0.05;
}
if (goods[i][2] <= 7)
{
    ase_stockpile_country_price_target_saving_ai_value -= 0.05;
}
if (goods[i][2] <= 6)
{
    ase_stockpile_country_price_target_saving_ai_value -= 0.05;
}
if (goods[i][2] <= 5)
{
    ase_stockpile_country_price_target_saving_ai_value -= 0.05;
}
if (goods[i][2] <= 4)
{
    ase_stockpile_country_price_target_saving_ai_value -= 0.05;
}
ase_stockpile_country_price_target_saving_ai_value = Math.round((ase_stockpile_country_price_target_saving_ai_value + Number.EPSILON) * 100) / 100;

let ase_stockpile_country_price_target_spending_ai_value = 0.10;
if (goods[i][2] <= 8)
{
    ase_stockpile_country_price_target_spending_ai_value += 0.05;
}
if (goods[i][2] <= 4)
{
    ase_stockpile_country_price_target_spending_ai_value += 0.05;
}
ase_stockpile_country_price_target_spending_ai_value = Math.round((ase_stockpile_country_price_target_spending_ai_value + Number.EPSILON) * 100) / 100;

ase_country_price_target_values += `
ase_stockpile_country_price_target_saving_` + goods[i][0] + ` = {
    if = {
        limit = {
            is_player = yes
        }
        if = {
            limit = {
                has_variable = ase_stockpile_country_price_target_saving_` + goods[i][0] + `
            }
            value = var:ase_stockpile_country_price_target_saving_` + goods[i][0] + `
        }
        else = {
            value = ase_stockpile_price_target_saving_default
        }
    }
    else = {
        value = ` + (goods[i][0] === 'oil' ? `-0.10
        if = {
            limit = {
                ase_stockpile_goods_priority_` + goods[i][0] + ` <= 10
            }
            subtract = 0.05
            if = {
                limit = {
                    ase_stockpile_goods_priority_` + goods[i][0] + ` <= 8
                }
                subtract = 0.05
                if = {
                    limit = {
                        ase_stockpile_goods_priority_` + goods[i][0] + ` <= 7
                    }
                    subtract = 0.05
                    if = {
                        limit = {
                            ase_stockpile_goods_priority_` + goods[i][0] + ` <= 6
                        }
                        subtract = 0.05
                        
                        if = {
                            limit = {
                                ase_stockpile_goods_priority_` + goods[i][0] + ` <= 5
                            }
                            subtract = 0.05
                        }
                    }
                }
            }
        }` : ase_stockpile_country_price_target_saving_ai_value) + `
    }

    min = ase_stockpile_country_price_target_saving_min
    max = ase_stockpile_country_price_target_saving_max
}

ase_stockpile_country_price_target_spending_` + goods[i][0] + ` = {
    if = {
        limit = {
            is_player = yes
        }
        if = {
            limit = {
                has_variable = ase_stockpile_country_price_target_spending_` + goods[i][0] + `
            }
            value = var:ase_stockpile_country_price_target_spending_` + goods[i][0] + `
        }
        else = {
            value = ase_stockpile_price_target_spending_default
        }
    }
    else = {
        value = ` + (goods[i][0] === 'oil' ? `0.10
        if = {
            limit = {
                ase_stockpile_goods_priority_` + goods[i][0] + ` <= 8
            }
            add = 0.05
            if = {
                limit = {
                    ase_stockpile_goods_priority_` + goods[i][0] + ` <= 4
                }
                add = 0.05
            }
        }` : ase_stockpile_country_price_target_spending_ai_value) +  `
    }

    min = ase_stockpile_country_price_target_spending_min
    max = ase_stockpile_country_price_target_spending_max
}
`;



ase_market_reserve_values += `
ase_stockpile_market_reserve_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_market_reserve_` + goods[i][0] + `
        }
        value = var:ase_stockpile_market_reserve_` + goods[i][0] + `
    }
    else_if = {
        limit = {
            this = market.owner
        }
        value = ase_stockpile_country_reserve_` + goods[i][0] + `
    }
    else = {
        value = 0
    }
}

ase_stockpile_market_reserve_target_` + goods[i][0] + ` = {
    value = ase_stockpile_market_volume_average_` + goods[i][0] + `
    divide = 10
    multiply = ase_stockpile_country_reserve_weeks_target_` + goods[i][0] + `
}

ase_stockpile_market_to_max_reserve_` + goods[i][0] + ` = {
    if = {
        limit = {
            ase_stockpile_market_reserve_` + goods[i][0] + ` = 0
        }
        value = 0
    }
    else_if = {
        limit = {
            ase_stockpile_market_reserve_target_` + goods[i][0] + ` = 0
        }
        value = 1
    }
    else = {
        value = ase_stockpile_market_reserve_` + goods[i][0] + `
        divide = ase_stockpile_market_reserve_target_` + goods[i][0] + `
        min = 0
    }
}

ase_stockpile_market_reserve_limit_` + goods[i][0] + ` = {
    value = ase_stockpile_market_volume_average_` + goods[i][0] + `
    divide = 10
    multiply = 52` /* Hardcoded ase_stockpile_goods_reserve_weeks_default */ + `
    multiply = ase_stockpile_country_reserve_weeks_max_factor_` + goods[i][0] + `
    multiply = 2.00
    min = 20
}
`;



ase_market_transfer_values += `
ase_stockpile_market_transfer_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_market_transfer_` + goods[i][0] + `
        }
        value = var:ase_stockpile_market_transfer_` + goods[i][0] + `
    }
    else_if = {
        limit = {
            this = market.owner
        }
        value = ase_stockpile_country_transfer_` + goods[i][0] + `
    }
    else = {
        value = 0
    }
}
`;



ase_country_reserve_values += `
ase_stockpile_country_reserve_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_country_reserve_` + goods[i][0] + `
        }
        value = var:ase_stockpile_country_reserve_` + goods[i][0] + `
    }
    else = {
        value = 0
    }
}

ase_stockpile_country_to_market_reserve_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_country_reserve_` + goods[i][0] + `
            market.owner.ase_stockpile_market_reserve_` + goods[i][0] + ` > 0
        }
        value = var:ase_stockpile_country_reserve_` + goods[i][0] + `
        divide = market.owner.ase_stockpile_market_reserve_` + goods[i][0] + `
        min = 0
        max = 1
    }
    else = {
        value = 0
    }
}
`;



ase_country_transfer_values += `
ase_stockpile_country_transfer_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_country_transfer_` + goods[i][0] + `
        }
        value = var:ase_stockpile_country_transfer_` + goods[i][0] + `
    }
    else = {
        value = 0
    }
}
`;



ase_state_reserve_values += `
ase_stockpile_state_reserve_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_state_reserve_` + goods[i][0] + `
        }
        value = var:ase_stockpile_state_reserve_` + goods[i][0] + `
    }
    else = {
        value = 0
    }
}

ase_stockpile_state_to_country_reserve_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_state_reserve_` + goods[i][0] + `
            owner.ase_stockpile_country_reserve_` + goods[i][0] + ` > 0
        }
        value = var:ase_stockpile_state_reserve_` + goods[i][0] + `
        divide =  owner.ase_stockpile_country_reserve_` + goods[i][0] + `
        min = 0
        max = 1
    }
    else = {
        value = 0
    }
}

ase_stockpile_state_to_market_reserve_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_state_reserve_` + goods[i][0] + `
            owner.market.owner.ase_stockpile_market_reserve_` + goods[i][0] + ` > 0
        }
        value = var:ase_stockpile_state_reserve_` + goods[i][0] + `
        divide = owner.market.owner.ase_stockpile_market_reserve_` + goods[i][0] + `
        min = 0
        max = 1
    }
    else = {
        value = 0
    }
}
`;



ase_state_transfer_values += `
ase_stockpile_state_transfer_` + goods[i][0] + ` = {
    if = {
        limit = {
            has_variable = ase_stockpile_state_transfer_` + goods[i][0] + `
        }
        value = var:ase_stockpile_state_transfer_` + goods[i][0] + `
    }
    else = {
        value = 0
    }
}
`;



ase_scripted_trigger_values += `
ase_will_country_stockpile_` + goods[i][0] + ` = {
    if = {
        limit = {
            ase_is_country_allowed_to_stockpile = yes
            ase_should_country_stockpile_goods = {
                goods = ` + goods[i][0] + `
            }
        }
        value = 1
    }
    else = {
        value = 0
    }
}
`;



// AI values are hardcoded to save performance
let ase_stockpile_country_reserve_weeks_target_factor_value = goods[i][1];
if (goods[i][2] <= 10)
{
    ase_stockpile_country_reserve_weeks_target_factor_value -= (goods[i][1] * 0.25);
}
if (goods[i][2] <= 8)
{
    ase_stockpile_country_reserve_weeks_target_factor_value -= (goods[i][1] * 0.25);
}
if (goods[i][2] <= 4)
{
    ase_stockpile_country_reserve_weeks_target_factor_value -= (goods[i][1] * 0.25);
}
ase_stockpile_country_reserve_weeks_target_factor_value = Math.round((ase_stockpile_country_reserve_weeks_target_factor_value + Number.EPSILON) * 100) / 100;

ase_country_reserve_weeks_values += `
ase_stockpile_country_reserve_weeks_target_` + goods[i][0] + ` = {
    value = 52` /* Hardcoded ase_stockpile_goods_reserve_weeks_default */ + `
    multiply = ase_stockpile_country_reserve_weeks_target_factor_` + goods[i][0] + `
}

ase_stockpile_country_reserve_weeks_target_factor_` + goods[i][0] + ` = {
    if = {
        limit = {
            is_player = yes
        }
        if = {
            limit = {
                has_variable = ase_stockpile_country_reserve_weeks_target_factor_` + goods[i][0] + `
            }
            value = var:ase_stockpile_country_reserve_weeks_target_factor_` + goods[i][0] + `
        }
        else = {
            value = ase_stockpile_goods_reserve_max_factor_` + goods[i][0] + `
            multiply = ase_stockpile_player_reserve_weeks_target_factor
        }
    }
    else = {
        value = ` + (goods[i][0] === 'oil' ? `ase_stockpile_goods_reserve_max_factor_` + goods[i][0] + `
        if = {
            limit = {
                ase_stockpile_goods_priority_` + goods[i][0] + ` <= 10
            }
            multiply = {
                value = 0.75
                if = {
                    limit = {
                        ase_stockpile_goods_priority_` + goods[i][0] + ` <= 8
                    }
                    subtract = 0.25
                }
                if = {
                    limit = {
                        ase_stockpile_goods_priority_` + goods[i][0] + ` <= 4
                    }
                    subtract = 0.25
                }
            }
        }` : ase_stockpile_country_reserve_weeks_target_factor_value) + `
        multiply = ase_stockpile_goods_reserve_weeks_max_factor
    }

    multiply = 4
    round = yes
    divide = 4

    min = 0.25` /* Hardcoded ase_stockpile_goods_reserve_weeks_factor_lower_limit */ + `
    max = ase_stockpile_country_reserve_weeks_max_factor_` + goods[i][0] + `
}

ase_stockpile_country_reserve_weeks_max_factor_` + goods[i][0] + ` = {
    if = {
        limit = {
            ase_stockpile_goods_reserve_max_factor_` + goods[i][0] + ` = 1
        }
        value = ase_stockpile_goods_reserve_weeks_max_factor
    }
    else = {
        value = ase_stockpile_goods_reserve_max_factor_` + goods[i][0] + `
        multiply = ase_stockpile_goods_reserve_weeks_max_factor

        multiply = 4
        round = yes
        divide = 4

        min = 0.25` /* Hardcoded ase_stockpile_goods_reserve_weeks_factor_lower_limit */ + `
        max = 2.00` /* Hardcoded ase_stockpile_goods_reserve_weeks_factor_upper_limit */ + `
    }
}
`;



ase_generated_scripted_guis += `
ase_stockpile_toggle_direction_permission_both_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_toggle_direction_permission_both = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        ase_stockpile_toggle_direction_permission_both_is_shown = {
            goods = ` + goods[i][0] + `
        }
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_toggle_direction_permission_saving_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_toggle_direction_permission_saving = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        ase_stockpile_toggle_direction_permission_saving_is_shown = {
            goods = ` + goods[i][0] + `
        }
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_toggle_direction_permission_spending_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_toggle_direction_permission_spending = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        ase_stockpile_toggle_direction_permission_spending_is_shown = {
            goods = ` + goods[i][0] + `
        }
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_toggle_direction_permission_none_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_toggle_direction_permission_none = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        ase_stockpile_toggle_direction_permission_none_is_shown = {
            goods = ` + goods[i][0] + `
        }
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_country_price_target_saving_decrease_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_country_price_target_saving_decrease = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        ase_stockpile_country_price_target_saving_decrease_is_valid = {
            goods = ` + goods[i][0] + `
        }
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_country_price_target_saving_increase_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_country_price_target_saving_increase = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        ase_stockpile_country_price_target_saving_increase_is_valid = {
            goods = ` + goods[i][0] + `
        }
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_country_price_target_spending_decrease_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_country_price_target_spending_decrease = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        ase_stockpile_country_price_target_spending_decrease_is_valid = {
            goods = ` + goods[i][0] + `
        }
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_country_price_target_spending_increase_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_country_price_target_spending_increase = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        ase_stockpile_country_price_target_spending_increase_is_valid = {
            goods = ` + goods[i][0] + `
        }
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_country_reserve_weeks_target_decrease_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_country_reserve_weeks_target_decrease = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        ase_stockpile_country_reserve_weeks_target_decrease_is_valid = {
            goods = ` + goods[i][0] + `
        }
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_country_reserve_weeks_target_increase_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_country_reserve_weeks_target_increase = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        ase_stockpile_country_reserve_weeks_target_increase_is_valid = {
            goods = ` + goods[i][0] + `
        }
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_create_list_of_states_in_market_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_create_list_of_states_in_market = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_clear_list_of_states_in_market_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_clear_list_of_states_in_market = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_create_list_of_states_in_country_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_create_list_of_states_in_country = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_clear_list_of_states_in_country_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_clear_list_of_states_in_country = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_create_list_of_countries_in_market_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_create_list_of_countries_in_market = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}

ase_stockpile_clear_list_of_countries_in_market_` + goods[i][0] + ` = {
    scope = country

    effect = {
        ase_stockpile_clear_list_of_countries_in_market = {
            goods = ` + goods[i][0] + `
        }
    }

    is_shown = {
        always = yes
    }

    is_valid = {
        always = yes
    }

    ai_is_valid = {
        always = no
    }
}
`;


}

// Close variables that were initialized with some code already
ase_production_methods_saving += `
        }
    }
}
`;
ase_production_methods_spending += `
        }
    }
}
`;
ase_modifiers_input_mult_all_goods += `
}
`;
ase_modifiers_output_mult_all_goods += `
}
`;
ase_perform_effect_for_every_market_goods += `
}
`;

console.log('### PRODUCTION METHODS START ###');
console.log(
    ase_production_methods_saving +
    ase_production_methods_spending
);
console.log('### PRODUCTION METHODS END ###');
console.log('##########');
console.log('### MODIFIER TYPES START ###');
console.log(
    ase_modifier_types_input_add +
    ase_modifier_types_input_mult +
    ase_modifier_types_output_mult
);
console.log('### MODIFIER TYPES END ###');
console.log('##########');
console.log('### GENERATED MODIFIERS START ###');
console.log(
    ase_modifiers_input_mult_all_goods +
    ase_modifiers_input_mult +
    ase_modifiers_output_mult_all_goods +
    ase_modifiers_output_mult
);
console.log('### GENERATED MODIFIERS END ###');
console.log('##########');
console.log('### GENERATED EFFECTS START ###');
console.log(
    ase_perform_effect_for_every_market_goods
);
console.log('### GENERATED EFFECTS END ###');
console.log('##########');
console.log('### GENERATED VALUES START ###');
console.log(
    ase_stockpile_goods_priority_values + '\n' +
    ase_stockpile_goods_reserve_max_factor_values + '\n' +
    ase_market_volume_values +
    ase_country_price_target_values +
    ase_market_reserve_values +
    ase_market_transfer_values +
    ase_country_reserve_values +
    ase_country_transfer_values +
    ase_state_reserve_values +
    ase_state_transfer_values +
    ase_scripted_trigger_values +
    ase_country_reserve_weeks_values
);
console.log('### GENERATED VALUES END ###');
console.log('##########');
console.log('### GENERATED GUIS START ###');
console.log(
    ase_generated_scripted_guis
);
console.log('### GENERATED GUIS END ###');
console.log('##########');
console.log('### GENERATED LOCALIZATION START ###');
console.log(
    ase_generated_localization
);
console.log('### GENERATED LOCALIZATION END ###');