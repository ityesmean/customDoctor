package com.roller.doc.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name = "hospital_my")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HospitalMy {

    @Id
    @Column(name = "hospital_my_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hospital_my_id;

    @Column(name = "user_id", columnDefinition = "bigint")
    private long user_id;

    @Column(name = "hospital_id", columnDefinition = "INT")
    private long hospital_id;

    @ColumnDefault("false")
    @Column(name = "hospital_my_del", columnDefinition = "BOOLEAN", nullable = false)
    private Boolean hospital_my_del;

//    @JsonIgnore
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="user_id")
//	private User user;
}
