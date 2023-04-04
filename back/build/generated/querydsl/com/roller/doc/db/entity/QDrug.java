package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDrug is a Querydsl query type for Drug
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDrug extends EntityPathBase<Drug> {

    private static final long serialVersionUID = -1149991608L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDrug drug = new QDrug("drug");

    public final StringPath drug_colorb = createString("drug_colorb");

    public final StringPath drug_colorf = createString("drug_colorf");

    public final NumberPath<Long> drug_id = createNumber("drug_id", Long.class);

    public final StringPath drug_img = createString("drug_img");

    public final StringPath drug_ingre = createString("drug_ingre");

    public final StringPath drug_line = createString("drug_line");

    public final StringPath drug_markb = createString("drug_markb");

    public final StringPath drug_markf = createString("drug_markf");

    public final StringPath drug_name = createString("drug_name");

    public final StringPath drug_type = createString("drug_type");

    public final ListPath<DrugAvoid, QDrugAvoid> drugAvoids = this.<DrugAvoid, QDrugAvoid>createList("drugAvoids", DrugAvoid.class, QDrugAvoid.class, PathInits.DIRECT2);

    public final QDrugDesc drugDesc;

    public final ListPath<DrugMyPill, QDrugMyPill> drugMyPills = this.<DrugMyPill, QDrugMyPill>createList("drugMyPills", DrugMyPill.class, QDrugMyPill.class, PathInits.DIRECT2);

    public QDrug(String variable) {
        this(Drug.class, forVariable(variable), INITS);
    }

    public QDrug(Path<? extends Drug> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDrug(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDrug(PathMetadata metadata, PathInits inits) {
        this(Drug.class, metadata, inits);
    }

    public QDrug(Class<? extends Drug> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.drugDesc = inits.isInitialized("drugDesc") ? new QDrugDesc(forProperty("drugDesc"), inits.get("drugDesc")) : null;
    }

}

